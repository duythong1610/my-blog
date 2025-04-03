import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const tagApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/user/tags",
      params,
    }),
};
