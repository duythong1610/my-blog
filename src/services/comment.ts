import { commentApi } from "@/api/comment.api";

export const getCommentsByPostId = async (postId: string) => {
  const res = await commentApi.getAll({ postId });
  return res.data;
};

export const createComment = async (data: {
  postId: string;
  content: string;
  parentId?: string;
}) => {
  const res = await commentApi.create(data);
  return res.data;
};

export const updateComment = async (id: string, content: string) => {
  const res = await commentApi.update(id, { content });
  return res.data;
};

export const deleteComment = async (id: string) => {
  const res = await commentApi.delete(id);
  return res.data;
};
