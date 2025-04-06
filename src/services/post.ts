import { postApi } from "@/api/post.api";

export const getPostDetail = async (slug: string) => {
  const response = await postApi.findOne(slug);
  return response.data;
};

export const toggleLikePost = async ({ postId }: { postId: string }) => {
  const res = await postApi.toggleLike(postId);
  return res.data;
};
