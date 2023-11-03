import {
  Button,
  ControlGroup,
  HTMLSelect,
  InputGroup,
} from "@blueprintjs/core";
import { generatePagesArray } from "../../utils";

export interface IPager {
  pageSize: number;
  currentPage: number;
  total: number;
}

const Pagination = (props: {
  total: number;
  pageSize?: number;
  pagerCount?: number;
  pageSizeArr: number[];
  currentPage: number;
  onChange: (currentPage: number, pageSize: number) => void;
}) => {
  const {
    onChange,
    pageSizeArr = [5, 10, 15, 20, 50, 100],
    currentPage = 1,
    pageSize = 5,
    total = 0,
    pagerCount = 7,
  } = props;
  // 计算总页数
  const totalPage = Math.ceil(total / pageSize);
  // 计算页码数组
  const pages = generatePagesArray(totalPage, pagerCount, currentPage);
  // 改变每页条数
  const handleSelect = (event: React.FormEvent<HTMLElement>) => {
    onChange(1, parseInt((event.target as HTMLInputElement).value));
  };
  // 选中某一页
  const handlePage = (index: number) => {
    if (index === currentPage || index === 0 || index === totalPage + 1) return;
    onChange(index, pageSize);
  };
  // 跳转某一页
  const handleGoto = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = parseInt((e.target as HTMLInputElement).value);
      if (target < 0 || target > totalPage || target === currentPage) return;
      onChange(target, pageSize);
    }
  };
  return (
    // 分页器container
    <div className="flex items-center">
      {/* 总条数提示 */}
      {`共${total}条`}
      {/* 每页条数选择器 */}
      <ControlGroup className="ml-4">
        <HTMLSelect
          options={pageSizeArr.map((v) => {
            return { labal: v, value: `${v}条/页` };
          })}
          fill
          onChange={handleSelect}
        />
      </ControlGroup>
      {/* pager container */}
      <ControlGroup className="ml-4">
        {/* 前一页按钮 */}
        <Button
          icon="caret-left"
          onClick={() => handlePage(currentPage - 1)}
        ></Button>
        {/* 页码开始部分 */}
        {pages[0] &&
          pages[0].map((v, i) => (
            <Button
              key={i}
              onClick={() => handlePage(v)}
              intent={currentPage === v ? "primary" : "none"}
            >
              {v}
            </Button>
          ))}
        {/* 第一个省略号 */}
        {pages[1] && pages[1].length > 0 && (
          <Button
            className="before:absolute before:bottom-0.5 text-2xl before:content-['···'] hover:before:content-['«']"
            onClick={() => handlePage(currentPage - pagerCount)}
          ></Button>
        )}
        {/* 页码中间部分 */}
        {pages[2] &&
          pages[2].map((v, i) => (
            <Button
              key={i}
              onClick={() => handlePage(v)}
              intent={currentPage === v ? "primary" : "none"}
            >
              {v}
            </Button>
          ))}
        {/* 第二个省略号 */}
        {pages[3] && pages[3].length > 0 && (
          <Button
            className="before:absolute before:bottom-0.5 text-2xl before:content-['···'] hover:before:content-['»']"
            onClick={() => handlePage(currentPage + pagerCount)}
          ></Button>
        )}
        {/* 页码结束部分 */}
        {pages[4] &&
          pages[4].map((v, i) => (
            <Button
              key={i}
              onClick={() => handlePage(v)}
              intent={currentPage === v ? "primary" : "none"}
            >
              {v}
            </Button>
          ))}
        {/* 后一页按钮 */}
        <Button
          icon="caret-right"
          onClick={() => handlePage(currentPage + 1)}
        ></Button>
      </ControlGroup>
      {/* 快速跳转 */}
      <div className="flex items-center ml-4">
        <span>前往</span>
        <InputGroup
          defaultValue={"1"}
          className="w-16 mx-2"
          inputClassName="text-center"
          onKeyUp={handleGoto}
        />
        <span>页</span>
      </div>
    </div>
  );
};

export default Pagination;
