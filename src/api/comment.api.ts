import { request } from "@/utils/request";

export const commentApi = {
  getAll: (params?: any) =>
    request({
      url: "/user/comment",
      params,
    }),

  create: (data: any) =>
    request({
      url: "/user/comment",
      data,
      method: "post",
    }),

  update: (id: string, data: { content: string }) =>
    request({
      url: `/user/comment/${id}`,
      data,
      method: "put",
    }),

  delete: (id: string) =>
    request({
      url: `/user/comment/${id}`,
      method: "delete",
    }),
};
