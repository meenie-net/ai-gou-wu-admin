import { http } from "./http";
import { permisson } from "../../mock/permission";
import { ICategory } from "../views/Goods/goods";
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
  deleteUser(id: string) {
    console.log("id", id);
    return mockFetch(null);
  },
  getPermission(type: "admin" | "guest") {
    console.log("type", type);
    return mockFetch(permisson[type]);
  },
};

// 开发环境
const base_url = "http://127.0.0.1:3000";
// 测试环境
// const base_url = 'http://127.0.0.1:4523/m1/2564219-0-default'
// 生产环境
// const base_url = 'http://127.0.0.1:4523/m1/2564219-0-default'
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
  getUserList() {
    return http.get(base_url + "/user");
  },
  deleteUser() {
    return http.get(base_url + "/spu");
  },
  getGoodsList() {
    return http.get(base_url + "/spu");
  },
  deleteGoods() {
    return http.get(base_url + "/spu");
  },
  getAllCategory() {
    return http.get(base_url + "/category");
  },
  addCategory(category: ICategory) {
    return http.post(base_url + "/category", category);
  },
};
