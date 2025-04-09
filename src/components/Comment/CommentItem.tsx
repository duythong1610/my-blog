import { useDeleteComment, useUpdateComment } from "@/hooks/useCommentMutation";
import { Comment } from "@/types/comment";
import { User } from "@/types/user";
import { formatTime } from "@/utils/date";
import { Button, Tooltip } from "antd";
import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Link from "next/link";

interface CommentItemProps {
  comment: Comment & { replies?: (Comment & { replies?: Comment[] })[] };
  postId: string;
  currentUser: User | null;
  depth: number;
  onDelete?: (commentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  postId,
  currentUser,
  depth = 0,
  onDelete,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const { mutate: updateComment } = useUpdateComment(postId);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editContent.trim()) {
      updateComment({ id: comment._id, content: editContent });
      setIsEditing(false);
    }
  };

  const isOwner = currentUser && currentUser._id === comment.user._id;
  const maxDepth = 3; // Giới hạn độ sâu của nested comments

  return (
    <div
      className={`${depth > 0 ? "pl-4 md:pl-8 border-l border-gray-200" : ""}`}
    >
      <div className="bg-white dark:bg-[#222] rounded-lg p-4 shadow-sm">
        {/* Comment header */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <Link href={`/user/${comment.user.username}`}>
              <img
                src={comment.user?.avatar || ""}
                alt={comment.user.fullName}
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Link href={`/user/${comment.user.username}`}>
                  <div className="font-medium">{comment.user.fullName}</div>
                </Link>
                <div>
                  {(comment?.user.username == "writeflow" ||
                    comment?.user.username == "auduythong") && (
                    <Tooltip title="Tài khoản đã được xác minh">
                      <RiVerifiedBadgeFill className="text-lg md:text-xl fill-purple-500" />
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="text-xs dark:text-gray-400 text-gray-500">
                {formatTime(comment.createdAt)}
              </div>
            </div>
          </div>

          {isOwner && (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 text-sm"
                disabled={isEditing}
              >
                Sửa
              </button>
              <button
                onClick={() => onDelete?.(comment._id)}
                className="text-gray-500 dark:text-gray-400 hover:text-red-600 text-sm"
              >
                Xóa
              </button>
            </div>
          )}
        </div>

        {/* Comment content */}
        {isEditing ? (
          <form onSubmit={handleUpdate} className="mt-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(comment.content);
                }}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Hủy
              </button>
              <Button
                htmlType="submit"
                type="primary"
                className="px-3 py-1 text-sm text-white rounded-md"
              >
                Lưu
              </Button>
            </div>
          </form>
        ) : (
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap break-words">{comment.content}</p>
          </div>
        )}

        {/* Comment actions */}
        {!isEditing && (
          <div className="mt-3 flex space-x-4">
            {depth < maxDepth && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                {isReplying ? "Hủy trả lời" : "Trả lời"}
              </button>
            )}
          </div>
        )}

        {/* Reply form */}
        {isReplying && (
          <div className="mt-3">
            <CommentForm
              postId={postId}
              parentId={comment._id}
              currentUser={currentUser}
              onSuccess={() => setIsReplying(false)}
            />
          </div>
        )}
      </div>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              postId={postId}
              currentUser={currentUser}
              depth={depth + 1}
              onDelete={() => onDelete?.(reply._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
