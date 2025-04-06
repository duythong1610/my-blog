import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/services/comment";
import { User } from "@/types/user";

export const useCreateComment = ({
  postId,
  currentUser,
}: {
  postId: string;
  currentUser: User;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onMutate: async ({ postId, content }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });
      const previous = queryClient.getQueryData(["comments", postId]);

      // Optimistic update
      queryClient.setQueryData(["comments", postId], (old: any) => {
        const optimisticComment = {
          _id: `temp-${Date.now()}`, // temporary id
          content,
          postId,
          createdAt: new Date().toISOString(),
          user: currentUser,
          isOptimistic: true,
        };
        return old ? [optimisticComment, ...old] : [optimisticComment];
      });

      return { previous, postId };
    },

    onError: (_err, _data, context) => {
      if (context?.postId) {
        queryClient.setQueryData(
          ["comments", context.postId],
          context.previous
        );
      }
    },

    onSettled: (_data, _err, _variables) => {
      if (_variables?.postId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", _variables.postId],
        });
      }
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
