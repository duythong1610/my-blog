import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const followApi = {
  findAllFollowers: (params?: any): AxiosPromise<any> =>
    request({
      url: "/user/followers",
      params,
    }),
  checkFollow: (params?: any): AxiosPromise<any> =>
    request({
      url: "/user/check-follow",
      params,
    }),
  findAllFollowing: (params?: any): AxiosPromise<any> =>
    request({
      url: "/user/following",
      params,
    }),

  follow: (data: any): AxiosPromise<any> =>
    request({
      url: `/user/follow`,
      method: "post",
      data,
    }),
  unFollow: (data: any): AxiosPromise<any> =>
    request({
      url: `/user/unfollow`,
      method: "delete",
      data,
    }),
};
