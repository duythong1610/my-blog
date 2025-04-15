import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/services/comment";
import { User } from "@/types/user";
import { Comment } from "@/types/comment";

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

    onMutate: async ({
      content,
      parentId,
    }: {
      content: string;
      parentId?: string;
    }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

      const previous = queryClient.getQueryData(["comments", postId]) as {
        pages: Comment[][];
        pageParams: unknown[];
      };

      const optimisticComment = {
        _id: `temp-${Date.now()}`,
        content,
        postId,
        parent: parentId ? { _id: parentId } : null,
        createdAt: new Date().toISOString(),
        user: currentUser,
        isOptimistic: true,
      };

      queryClient.setQueryData(["comments", postId], (old: any) => {
        if (!old || !old.pages) {
          return {
            pages: [[optimisticComment]],
            pageParams: [1],
          };
        }

        return {
          ...old,
          pages: [[optimisticComment, ...old.pages[0]], ...old.pages.slice(1)],
        };
      });

      return { previous, optimisticComment };
    },

    onError: (_err, _data, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["comments", postId], context.previous);
      }
    },

    onSuccess: (data, _variables, context) => {
      if (context?.optimisticComment) {
        queryClient.setQueryData(["comments", postId], (old: any) => {
          return {
            ...old,
            pages: old.pages.map((page: Comment[]) =>
              page.map((c) =>
                c._id === context.optimisticComment._id
                  ? { ...data, user: currentUser }
                  : c
              )
            ),
          };
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
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
