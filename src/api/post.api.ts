import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const postApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/user/post",
      params,
    }),
  findMyPost: (params?: any): AxiosPromise<any> =>
    request({
      url: "/user/my-post",
      params,
    }),
  findOne: (id: string): AxiosPromise<any> =>
    request({
      url: `/user/post/${id}`,
    }),
  create: (data: any): AxiosPromise<any> =>
    request({
      url: "/user/post",
      data,
      method: "post",
    }),
  update: (id: number, data: any): AxiosPromise<any> =>
    request({
      url: `/user/post/${id}`,
      method: "patch",
      data,
    }),
  delete: (id: number): AxiosPromise<any> =>
    request({
      url: `/user/post/${id}`,
      method: "delete",
    }),
};
