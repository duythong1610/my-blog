import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/services/comment";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

export const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });
      const previous = queryClient.getQueryData(["comments", postId]);
      queryClient.setQueryData(["comments", postId], (old: any) => {
        old.filter((c: any) => c._id !== id);
      });
      return { previous };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(["comments", postId], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};

export const useUpdateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      updateComment(id, content),
    onMutate: async ({ id, content }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });
      const previous = queryClient.getQueryData(["comments", postId]);
      queryClient.setQueryData(["comments", postId], (old: any) =>
        old.map((c: any) => (c._id === id ? { ...c, content } : c))
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["comments", postId], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};
