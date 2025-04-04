import { message } from "antd";
import axios from "axios";
import { debounce } from "lodash";
import { getToken } from "./auth";

const isClient = typeof window !== "undefined";
// Kiểm tra xem có đang ở client không

if (isClient) {
  message.config({
    duration: 1.5,
  });
}

const debounceMessage = debounce((messageText) => {
  if (isClient) {
    message.error(messageText);
  }
}, 100);

// create an axios instance
const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60 * 5, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => {
    // do something with request error
    // eslint-disable-next-line no-console

    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200 && response.status !== 201) {
      if (
        response.status === 50008 ||
        response.status === 50012 ||
        response.status === 50014
      ) {
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    const status = error.response ? error.response.status : false;
    let msg = "";
    if (status) {
      msg = error.response.data.message;
    } else {
      msg = error.message;
    }

    if (!axios.isCancel(error)) debounceMessage(msg);

    return Promise.reject(error);
  }
);

export { service as request };
