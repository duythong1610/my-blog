import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const notificationSettingApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/user/notification-settings",
      params,
    }),

  update: (id: string, data: any): AxiosPromise<any> =>
    request({
      url: `/user/notification-settings/${id}`,
      method: "put",
      data,
    }),
};
