import {
  Button,
  ButtonGroup,
  Card,
  FormGroup,
  HotkeysProvider,
  InputGroup,
} from "@blueprintjs/core";
import { Table2, Column, Cell, SelectionModes } from "@blueprintjs/table";
import useTable from "../../hooks/useTable";
import { api } from "../../api";
import { generateArray } from "../../utils";
import GoodsDrawer from "./GoodsDrawer";
import Pagination from "./../../components/Pagination/index";
import { useHandleConfirm } from "../../hooks/useHandleConfirm";
import { IGoods, IGoodsResponse } from "./goods";
import { useButtonPermission } from "../../hooks/useButtonPermission";
import { format } from "date-fns";
import useOverlay, { IUseOverlay } from "../../hooks/useOverlay";

const GoodsList = () => {
  // 使用useTable Hooks获取table数据及相关方法
  const {
    tableData: goodsData, // 表格数据
    tableRef, // 表格Ref
    updateTable, // 表格更新函数
    loading, // 表格loading状态数组
    pager, // 表格数据分页器数据
    onSelection, // 多选回调函数
    multiSelectedArr, //多选结果数组
  } = useTable<IGoodsResponse, "id">( // 泛型参数：第一个代表泛型T，第二个参数代表多选数组的值对应的key
    api.getGoodsList, // 表格数据接口
    {} // 表格配置
  );
  const { BUTTONS } = useButtonPermission({ name: "userList" });
  const {
    props: goodsDrawerProps,
    rest: goodsDrawerRest,
    payload: goodsDrawerPayload,
  }: IUseOverlay = useOverlay({
    state: "view",
    goods: { name: "" },
  });
  const operatorWidth = (() => {
    return Object.keys(BUTTONS).reduce((prev, current) => {
      return prev + current.length * 14 + 43;
    }, 100);
  })();
  // 点击“添加商品”按钮操作
  const handleAdd = () => {
    goodsDrawerRest.setPayload({ ...goodsDrawerPayload, state: "add" });
    goodsDrawerRest.onOpen();
  };
  // 点击“查看”按钮操作
  const handleView = (goods: IGoods) => {
    goodsDrawerRest.setPayload({ ...goodsDrawerPayload, state: "view", goods });
    goodsDrawerRest.onOpen();
  };
  // 点击“编辑”按钮操作
  const handleEdit = (goods: IGoods) => {
    goodsDrawerRest.setPayload({ ...goodsDrawerPayload, state: "edit", goods });
    goodsDrawerRest.onOpen();
  };
  // 点击“删除”按钮操作
  const handleDelete = async (goods: IGoods) => {
    await useHandleConfirm({
      handler: api.deleteGoods,
      param: { id: goods.id },
      message: `确认删除${goods.name}吗？`,
      icon: "trash",
      intent: "danger",
    });
  };
  // Pagination组件的回调函数
  const paginationChange = (currentPage: number, pageSize: number) => {
    updateTable({ pageNum: currentPage, pageSize });
  };
  // Goods表格行首渲染函数
  const goodsRowHeaderRenderer = (rowIndex: number) => (
    <Cell className="flex items-center justify-center">{rowIndex + 1}</Cell>
  );
  // Goods表格操作列渲染函数
  const OperationCellRenderer = (rowIndex: number) => (
    <Cell className="flex items-center justify-center">
      <ButtonGroup minimal>
        <Button
          onClick={() => handleView(goodsData[rowIndex])}
          intent="primary"
          icon="eye-open"
        >
          查看
        </Button>
        {BUTTONS.edit && (
          <Button
            onClick={() => handleEdit(goodsData[rowIndex])}
            intent="primary"
            icon="edit"
          >
            编辑
          </Button>
        )}
        {BUTTONS.delete && (
          <Button
            onClick={() => handleDelete(goodsData[rowIndex])}
            intent="danger"
            icon="delete"
          >
            删除
          </Button>
        )}
      </ButtonGroup>
    </Cell>
  );
  // Goods表格ID列渲染函数
  const IDCellRenderer = (rowIndex: number) => (
    <Cell className="flex items-center justify-center">
      {goodsData[rowIndex]?.id}
    </Cell>
  );
  // Goods表格Name列渲染函数
  const NameCellRenderer = (rowIndex: number) => (
    <Cell className="flex items-center justify-center">
      {goodsData[rowIndex]?.name}
    </Cell>
  );
  // Goods表格Tel列渲染函数
  const BrandCellRenderer = (rowIndex: number) => (
    <Cell className="flex items-center justify-center">
      {goodsData[rowIndex]?.brandId}
    </Cell>
  );
  // Goods表格Tel列渲染函数
  const CategoryCellRenderer = (rowIndex: number) => (
    <Cell className="flex items-center justify-center">
      {goodsData[rowIndex]?.category}
    </Cell>
  );
  // Goods表格Tel列渲染函数
  const ChannelCellRenderer = (rowIndex: number) => (
    <Cell className="flex items-center justify-center">
      {goodsData[rowIndex]?.channel}
    </Cell>
  );
  // Goods表格Tel列渲染函数
  const DescCellRenderer = (rowIndex: number) => (
    <Cell className="flex items-center justify-center">
      {goodsData[rowIndex]?.desc}
    </Cell>
  );
  // Goods表格Tel列渲染函数
  const TimeCellRenderer = (rowIndex: number) => (
    <Cell className="flex items-center justify-center">
      {format(
        new Date(goodsData[rowIndex].updateTime || new Date()),
        "yyyy-MM-dd HH:mm:ss"
      )}
    </Cell>
  );
  return (
    // 用户列表container
    <div className="flex flex-col h-full">
      {/* 用户列表操作区 */}
      <Card className="flex justify-between pb-0">
        {/* 用户列表操作区左边 */}
        <div className="flex">
          <FormGroup
            inline
            label={"姓名"}
            labelFor="search-input"
            className="mr-2"
          >
            <InputGroup
              id="search-input"
              placeholder="请输入姓名"
              intent={"none"}
            />
          </FormGroup>
          <FormGroup
            inline
            label={"电话"}
            labelFor="text-input"
            className="mr-2"
          >
            <InputGroup
              id="text-input"
              placeholder="请输入电话"
              intent={"none"}
            />
          </FormGroup>
        </div>
        {/* 用户列表操作区右边 */}
        <div className="flex">
          <FormGroup inline className="mr-2">
            <Button icon="search" text="搜索" />
          </FormGroup>
          <FormGroup inline>
            <Button icon="reset" text="重置" />
          </FormGroup>
        </div>
      </Card>
      {/* 用户列表内容区 */}
      <Card className="flex flex-col flex-auto min-h-0 mt-3">
        {/* 用户列表内容区头部 */}
        <div className="flex">
          <FormGroup inline className="mr-2">
            <Button onClick={handleAdd} icon="search" text="新增商品" />
          </FormGroup>
          <FormGroup inline className="mr-2">
            <Button
              icon="search"
              text="批量删除"
              disabled={multiSelectedArr.length === 0}
            />
          </FormGroup>
        </div>
        {/* 用户列表内容区表格 */}
        <div className="flex-auto min-h-0">
          <HotkeysProvider>
            <Table2
              ref={tableRef}
              className="overflow-x-hidden"
              numRows={goodsData.length}
              rowHeights={generateArray(() => 40, goodsData.length)}
              loadingOptions={loading}
              rowHeaderCellRenderer={goodsRowHeaderRenderer}
              onSelection={(_) => onSelection(_, "id")} // 多选数组值对应的key
              selectionModes={SelectionModes.ROWS_ONLY}
              columnWidths={[operatorWidth, 250, 100, 100, 100, 100, 200, 150]} // 列宽
              numFrozenColumns={1} // 首列（操作列）冻结
              cellRendererDependencies={[goodsData]}
            >
              {/* 操作列，置左！！！ */}
              <Column
                id="goods-operation"
                name="操作"
                cellRenderer={OperationCellRenderer}
              />
              <Column id="goods-id" name="ID" cellRenderer={IDCellRenderer} />
              <Column
                id="goods-name"
                name="名称"
                cellRenderer={NameCellRenderer}
              />
              <Column
                id="goods-brand"
                name="品牌"
                cellRenderer={BrandCellRenderer}
              />
              <Column
                id="goods-category"
                name="分类"
                cellRenderer={CategoryCellRenderer}
              />
              <Column
                id="goods-channel"
                name="渠道"
                cellRenderer={ChannelCellRenderer}
              />
              <Column
                id="goods-desc"
                name="描述"
                cellRenderer={DescCellRenderer}
              />
              <Column
                id="goods-time"
                name="更新时间"
                cellRenderer={TimeCellRenderer}
              />
            </Table2>
          </HotkeysProvider>
        </div>
        {/* 用户列表内容区分页 */}
        <div className="flex justify-center mt-4">
          <Pagination
            {...pager}
            pagerCount={7} // 分页器页码按钮最大显示数：奇数 || 偶数--
            pageSizeArr={[5, 10, 15, 20, 50, 100, 500]} // 每页条数配置数组
            onChange={paginationChange}
          />
        </div>
      </Card>
      {/* 新增/更新用户侧边弹出 */}
      {goodsDrawerRest.isDisplay && (
        <GoodsDrawer
          drawProps={goodsDrawerProps}
          payload={goodsDrawerPayload}
        />
      )}
    </div>
  );
};

export default GoodsList;
