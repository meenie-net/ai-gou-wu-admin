import axios from "axios";
import { AppToaster } from "../utils/Toaster";
import { ResCodeEnum } from ".";

axios.defaults.timeout = 15000;
axios.defaults.headers.get["Content-Type"] = "application/json; charset=UTF-8";
axios.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";

const pending: any = {};
const CancelToken = axios.CancelToken;
const removePending = (key: string, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]("请勿重复请求");
  }
  delete pending[key];
};

const getRequestIdentify = (config: any, isRequest = false) => {
  let url = config.url;
  if (isRequest) {
    url = config.baseUrl + config.url.substring(1, config.url.length);
  }
  const arr = ["put", "post"];
  return arr.includes(config.method)
    ? encodeURIComponent(url + JSON.stringify(config.params))
    : encodeURIComponent(config.url + JSON.stringify(config.data));
};

axios.interceptors.request.use(
  (config: any) => {
    const requestData = getRequestIdentify(config, true);
    removePending(requestData, true);
    config.cancelToken = new CancelToken((c) => {
      pending[requestData] = c;
    });
    config.headers.token = JSON.parse(localStorage.getItem("token") || "{}");
    config.headers["Content-Type"] = "application/json; charset=UTF-8";
    return Promise.resolve(config);
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  async (res: any) => {
    if (res.data.code === ResCodeEnum.NOT_LOGIN) {
      localStorage.clear();
      AppToaster.show({ message: "未登录" });
      return Promise.reject(res);
    }
    AppToaster.show({ message: res.data.msg });
    return Promise.resolve(res);
  },
  async (err: any) => {
    AppToaster.show({ message: err.response });
    return Promise.reject(err.response);
  }
);

export const get = (url: string, params = {}) =>
  new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const post = (url: string, data = {}) =>
  new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const patch = (url: string, data = {}) =>
  new Promise((resolve, reject) => {
    axios
      .patch(url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const put = (url: string, data = {}) =>
  new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const del = (url: string, params = {}) =>
  new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export { axios as http };
