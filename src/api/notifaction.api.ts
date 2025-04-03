import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const notificationApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/user/notification",
      params,
    }),
};
