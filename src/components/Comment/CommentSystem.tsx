import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCommentsByPostId } from "@/services/comment";
import { User } from "@/types/user";
import { Comment } from "@/types/comment";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { PostSuccessModalRef } from "../Modal/PostSuccessModal";
import ConfirmDeleteCommentModal, {
  ConfirmDeleteCommentModalRef,
} from "../Modal/ConfirmDeleteCommentModal";
import { useDeleteComment } from "@/hooks/useCommentMutation";

interface CommentSystemProps {
  postId: string;
  currentUser: User | null;
}

const CommentSystem: React.FC<CommentSystemProps> = ({
  postId,
  currentUser,
}) => {
  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPostId(postId),
    refetchOnWindowFocus: false,
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

  const organizedComments = organizeComments(comments);

  return (
    <div>
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
      </div>
      <ConfirmDeleteCommentModal
        ref={confirmDeleteCommentModalRef}
        onSubmitOk={(commentId) => {
          console.log(commentId);
          deleteComment(commentId);
        }}
      />
    </div>
  );
};

export default CommentSystem;
