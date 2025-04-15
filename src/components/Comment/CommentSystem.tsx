import { useDeleteComment } from "@/hooks/useCommentMutation";
import { getCommentsByPostId } from "@/services/comment";
import { Comment } from "@/types/comment";
import { User } from "@/types/user";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useMemo, useRef } from "react";
import ConfirmDeleteCommentModal, {
  ConfirmDeleteCommentModalRef,
} from "../Modal/ConfirmDeleteCommentModal";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

interface CommentSystemProps {
  postId: string;
  currentUser: User | null;
}

const CommentSystem: React.FC<CommentSystemProps> = ({
  postId,
  currentUser,
}) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam = 1 }) =>
      getCommentsByPostId({ postId, page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined; // No more pages
      return allPages.length + 1; // Next page
    },
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });

  const { mutate: deleteComment } = useDeleteComment(postId);
  const confirmDeleteCommentModalRef = useRef<ConfirmDeleteCommentModalRef>();

  // Organize comments into a tree structure
  const organizeComments = (comments: Comment[]) => {
    const rootComments: Comment[] = [];
    const commentMap: Record<string, Comment & { replies: Comment[] }> = {};

    comments.forEach((comment) => {
      commentMap[comment._id] = { ...comment, replies: [] };
    });

    comments.forEach((comment) => {
      if (comment.parent) {
        if (commentMap[comment.parent._id]) {
          commentMap[comment.parent._id].replies.push(commentMap[comment._id]);
        }
      } else {
        rootComments.push(commentMap[comment._id]);
      }
    });

    return rootComments;
  };

  const flatComments = useMemo(
    () =>
      data?.pages.reduce((acc, page) => [...acc, ...page], [] as Comment[]) ||
      [],
    [data?.pages]
  );

  const organizedComments = useMemo(
    () => organizeComments(flatComments),
    [flatComments]
  );

  return (
    <div id="#comment">
      <h2 className="text-xl font-semibold mb-4">Bình luận</h2>
      <CommentForm postId={postId} currentUser={currentUser} />

      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md">
          Có lỗi khi tải bình luận. Vui lòng thử lại sau.
        </div>
      )}

      <div className="space-y-4 mt-6">
        {organizedComments.length === 0 && !isLoading ? (
          <div className="text-gray-500 text-center py-6">
            Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
          </div>
        ) : (
          organizedComments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={postId}
              currentUser={currentUser}
              depth={0}
              onDelete={(commentId) =>
                confirmDeleteCommentModalRef.current?.handleOpen(commentId)
              }
            />
          ))
        )}
        {hasNextPage && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
            >
              {isFetchingNextPage ? "Đang tải..." : "Xem thêm bình luận"}
            </button>
          </div>
        )}
      </div>
      <ConfirmDeleteCommentModal
        ref={confirmDeleteCommentModalRef}
        onSubmitOk={(commentId) => {
          deleteComment(commentId);
        }}
      />
    </div>
  );
};

export default CommentSystem;
