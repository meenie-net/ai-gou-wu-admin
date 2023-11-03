/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMenu } from "../config/menu";

/**
 *
 * @param menu 用户配置的menu数据
 * @returns 打平的menu
 */
export const flapMenu = (menu: IMenu[]): IMenu[] => {
  const serializedMenu: IMenu[] = JSON.parse(JSON.stringify(menu));
  return serializedMenu.flatMap((item) => [
    item,
    ...(item.children ? flapMenu(item.children) : []),
  ]);
};
/**
 *
 * @param cb 生成数组的回调函数
 * @param len 生成的数组长度
 * @returns 生成的数组
 */
export const generateArray = (
  cb: (v: any, k: number) => any,
  len: number
): any[] => {
  return Array.from(Array(len), (v, k) => cb(v, k));
};
/**
 *
 * @param height 表格行高
 * @param len 表格行数
 * @returns 生成的行高数组
 */
export const generateRowHeight = (height: number, len: number): number[] =>
  generateArray(() => height, len);
/**
 *
 * @param widthRateArr 宽度数组
 * @param totalWidth 总宽度
 * @returns 生成的列宽数组
 */
export const generateColumnWidth = (
  widthRateArr: number[],
  totalWidth: number
): number[] => {
  const result = widthRateArr.map((w) => Math.floor(totalWidth * w));
  result.pop();
  const lastWidth = totalWidth - eval(result.join("+")) - 30;
  result.push(lastWidth);
  return result;
};
/**
 *  生成等差数组
 * @param start 数组第一项的值
 * @param stop 数组最后一项的值
 * @param step 等差数组的差
 * @returns 生成的等差数组
 */
export const generateRangeArray = (start: number, stop: number, step: number) =>
  generateArray((_, i) => start + i * step, (stop - start) / step + 1);
/**
 *
 * @param totalPage 总页数
 * @param pagerCount 显示的最大页码数
 * @param currentPage 当前页码
 * @returns 生成的页码数组
 */
export const generatePagesArray = (
  totalPage: number,
  pagerCount: number,
  currentPage: number
): number[][] => {
  // 显示页数如果是偶数，处理成-1之后的奇数
  if (pagerCount % 2 === 0 && pagerCount !== 1) pagerCount--;
  // 显示页数等于1
  if (pagerCount === 1) {
    return [[currentPage]];
  }
  // 总页数小于等于显示页数
  if (totalPage <= pagerCount) {
    return [[...generateRangeArray(1, totalPage, 1)]];
  }
  // 页数大于显示数但小于等于显示数+2
  else if (pagerCount < totalPage && totalPage <= pagerCount + 2) {
    // 当前页小于等于显示页数的一半
    if (currentPage <= Math.ceil(pagerCount / 2)) {
      return [
        [1],
        [],
        [...generateRangeArray(2, pagerCount - 1, 1)],
        [0],
        [totalPage],
      ];
    } else {
      // 当前页大于显示页数的一半
      return [
        [1],
        [0],
        [...generateRangeArray(totalPage - pagerCount + 1, totalPage - 1, 1)],
        [],
        [totalPage],
      ];
    }
  }
  // 页数大于显示数+2
  else {
    // 当前页小于等于显示页数的一半
    if (currentPage <= Math.ceil(pagerCount / 2)) {
      return [
        [1],
        [],
        [...generateRangeArray(2, pagerCount - 1, 1)],
        [0],
        [totalPage],
      ];
    } else if (totalPage - pagerCount + 1 < currentPage) {
      // 当前页离末页的页数大于显示页数的一半
      return [
        [1],
        [0],
        [...generateRangeArray(totalPage - pagerCount + 1, totalPage - 1, 1)],
        [],
        [totalPage],
      ];
    } else {
      // 当前页处于中间
      return [
        [1],
        [0],
        [
          ...generateRangeArray(
            currentPage - Math.floor(pagerCount / 2) + 1,
            currentPage + Math.floor(pagerCount / 2) - 1,
            1
          ),
        ],
        [0],
        [totalPage],
      ];
    }
  }
};

export const assetsUrl = (url: string) => {
  return import.meta.env.MODE === "development"
    ? url
    : `${import.meta.env.VITE_BASE_PATH}${url}`;
};

export const handleStringChange = (handler: (value: string) => void) => {
  return (event: React.FormEvent<HTMLElement>) =>
    handler((event.target as HTMLInputElement).value);
};

export const handleBooleanChange = (handler: (checked: boolean) => void) => {
  return (event: React.FormEvent<HTMLElement>) =>
    handler((event.target as HTMLInputElement).checked);
};

export const handleValueChange = <T>(handler: (value: T) => void) => {
  return (event: React.FormEvent<HTMLElement>) =>
    handler((event.target as HTMLInputElement).value as unknown as T);
};

export const handleNumberChange = (handler: (value: number) => void) => {
  return handleStringChange((value) => handler(+value));
};
