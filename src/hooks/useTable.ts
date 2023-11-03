import { Region, Table2, TableLoadingOption } from "@blueprintjs/table";
import { RefObject, useEffect, useRef, useState } from "react";
import { generateArray, generateRangeArray } from "../utils";
import { IPaginationRequest, IResponse } from "../api";
import { IPager } from "../components/Pagination";
import { AxiosResponse } from "axios";

/**
 *
 * @param cb 获取表格数据的方法，例：api.getList
 * @param config 配置
 *
 * 默认：{
 ***********widthAyy: [] , // 列宽度数组
 ***********param: { // 请求参数（分页，查询等）
 ***************pageSize?: number = 10,
 ***************pageNum?: number = 1,
 ***************param?: object = {},
 ***********}
 *******}
 * @returns [tableData,wrapperRef,tableRef,update]
 */
function useTable<T, K extends keyof T>(
  cb: { (req: IPaginationRequest): Promise<AxiosResponse<any, any>> },
  config?: {
    widthArr?: Array<number>;
    param?: IPaginationRequest;
  }
): {
  tableData: T[];
  tableRef: RefObject<Table2>;
  updateTable: (args0?: IPaginationRequest) => void;
  loading: TableLoadingOption[];
  pager: IPager;
  onSelection: (regions: Region[], key: K) => void;
  multiSelectedArr: T[K][];
} {
  // 分页器页码数组
  const [pager, setPager] = useState<IPager>({
    pageSize: 5,
    currentPage: 1,
    total: 0,
  });
  // 表格数据
  const [tableData, setTableData] = useState<T[]>([
    ...generateArray(() => {
      return {};
    }, 13),
  ]);
  // 多选数组
  const [multiSelectedArr, setMultiSelectedArr] = useState<T[K][]>([]);
  // 表格loading状态
  const [loading, setLoading] = useState<TableLoadingOption[]>([
    TableLoadingOption.CELLS,
    TableLoadingOption.COLUMN_HEADERS,
    TableLoadingOption.ROW_HEADERS,
  ]);
  // 表格Ref
  const tableRef = useRef<Table2>(null);
  // 表格更新函数
  const updateTable = async (customReq?: IPaginationRequest) => {
    setLoading([
      TableLoadingOption.CELLS,
      TableLoadingOption.COLUMN_HEADERS,
      TableLoadingOption.ROW_HEADERS,
    ]);
    const param = customReq ||
      config?.param || {
        pageSize: pager.pageSize,
        pageNum: pager.currentPage,
      };
    const { data } = await cb(param);
    if (data.data) {
      setTableData([...data.data]);
      setPager({
        pageSize: data.pageSize || param.pageSize,
        currentPage: data.pageNum || param.pageNum,
        total: data.total || data.data.length,
      });
      setLoading([]);
    }
  };
  useEffect(() => {
    updateTable();
  }, []);
  // 表格多选回调
  const onSelection = (regions: Region[], key: K) => {
    if (regions.length === 0) return;
    const prev = regions
      .map((region) => {
        if (region.rows != undefined)
          return generateRangeArray(region.rows[0], region.rows[1], 1);
      })
      .flat()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((i) => tableData[i!][key]);
    setMultiSelectedArr(prev);
  };
  // 修复BluePrint Table只显示4条数据的BUG
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (!tableRef.current) return;
      const table = tableRef.current;
      if (!table.locator) return;
      const tableRect = table.locator.getViewportRect();
      if (config?.widthArr)
        table.setState({
          ...table.state,
          viewportRect: tableRect,
        });
      table.componentDidMount();
    });
    resizeObserver.observe(document.body);
    return () => {
      resizeObserver.disconnect();
    };
  }, [tableData]);
  return {
    tableData,
    tableRef,
    updateTable,
    loading,
    pager,
    onSelection,
    multiSelectedArr,
  };
}

export default useTable;
