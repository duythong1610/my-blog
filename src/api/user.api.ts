import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const userApi = {
  findOne: (username: string): AxiosPromise<any> =>
    request({
      url: `/user/profile-detail/${username}`,
    }),
};
