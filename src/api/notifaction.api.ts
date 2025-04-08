import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const notificationApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/user/notification",
      params,
    }),
  isRead: (id: string): AxiosPromise<any> =>
    request({
      url: `/user/notification/${id}/read`,
      method: "patch",
    }),
  markAll: (): AxiosPromise<any> =>
    request({
      url: `/user/notification/mark-all-read`,
      method: "patch",
    }),
};
