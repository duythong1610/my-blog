import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const postApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/user/post",
      params,
    }),
  findAllRelated: (params?: any): AxiosPromise<any> =>
    request({
      url: "/user/related-post",
      params,
    }),
  findMyPost: (params?: any): AxiosPromise<any> =>
    request({
      url: "/user/my-post",
      params,
    }),
  findLikedPost: (params?: any): AxiosPromise<any> =>
    request({
      url: "/user/liked-posts",
      params,
    }),

  getPostForEdit: (slug: string): AxiosPromise<any> =>
    request({
      url: `/user/post-edit/${slug}`,
    }),

  getPostsByUser: (params?: any): AxiosPromise<any> =>
    request({
      url: `/user/post-by-user`,
      params,
    }),

  findOne: (slug: string): AxiosPromise<any> =>
    request({
      url: `/user/post/${slug}`,
    }),

  increasePostView: (slug: string): AxiosPromise<any> =>
    request({
      url: `/user/view/${slug}`,
      method: "patch",
    }),
  create: (data: any): AxiosPromise<any> =>
    request({
      url: "/user/post",
      data,
      method: "post",
    }),
  toggleLike: (postId: string): AxiosPromise<any> =>
    request({
      url: `/user/like/${postId}`,
      method: "post",
    }),
  update: (id: string, data: any): AxiosPromise<any> =>
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
