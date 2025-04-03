import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const authApi = {
  login: (data: any): AxiosPromise<any> =>
    request({
      url: "/user/login",
      data,
      method: "post",
    }),

  passwordUpdate: (data: any): AxiosPromise<any> =>
    request({
      url: "/user/password/update",
      data,
      method: "post",
    }),

  updateProfile: (data: any): AxiosPromise<any> =>
    request({
      url: `/user/update-profile`,
      data,
      method: "put",
    }),

  profile: (): AxiosPromise<any> =>
    request({
      url: "/user/profile",
    }),

  sendOtp: (data: any): AxiosPromise<any> =>
    request({
      url: "/user/forgot",
      data,
      method: "post",
    }),
  resetPassword: (data: any): AxiosPromise<any> =>
    request({
      url: "/user/forgot/confirm",
      data,
      method: "post",
    }),
  verifyOtp: (data: any): AxiosPromise<any> =>
    request({
      url: "/user/otp/verify",
      data,
      method: "post",
    }),
};
