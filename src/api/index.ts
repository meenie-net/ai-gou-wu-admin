import { permisson } from "../../mock/permission";
import * as goods from "./modules/goods";
import * as brand from "./modules/brand";
import * as category from "./modules/category";
export interface IResponse {
  status: ResCodeEnum;
  msg: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
export interface IPaginationRequest {
  pageSize?: number;
  pageNum?: number;
  param?: object;
}

/**
 *** 10000--success
 *** 10001
 *** 20000
 *** 20001
 *** 30000
 *** 40000
 */
export enum ResCodeEnum {
  SUCCESS = 0,
  NOT_LOGIN = 50000,
}

// 开发环境
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mockFetch(data: any) {
  return new Promise<IResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        status: ResCodeEnum.SUCCESS,
        msg: "成功",
        data,
      });
    }, 1000);
  });
}
export const _api = {
  login(data: { username: string; password: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { username } = data;
    return mockFetch({
      username,
      avatar: "",
      permission: username === "admin" ? "admin" : "guest",
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register(_data: { username: string; password: string }) {
    return mockFetch(null);
  },
};

export const api = {
  login(data: { username: string; password: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { username } = data;
    return mockFetch({
      username,
      avatar: "",
      permission: username === "admin" ? "admin" : "guest",
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register(_data: { username: string; password: string }) {
    return mockFetch(null);
  },
  getPermission(type: "admin" | "guest") {
    console.log("type", type);
    return mockFetch(permisson[type]);
  },
  ...goods,
  ...category,
  ...brand,
};
