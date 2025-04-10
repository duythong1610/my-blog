"use client";

import { Post } from "@/types/post";
import { useEffect, useState } from "react";
import { FaComment, FaHeart, FaRegComments, FaRegHeart } from "react-icons/fa"; // Icons for like/unlike
import { AiOutlineEye } from "react-icons/ai"; // Icon for views
import { useMutation, useQueryClient } from "@tanstack/react-query"; // react-query for optimistic update
import { toggleLikePost } from "@/services/post";
import { Tooltip } from "antd";
import { useAppSelector } from "@/lib/hook";

const PostSummary = ({
  post,
  onScrollComment,
}: {
  post: Post;
  onScrollComment: () => void;
}) => {
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user.info);

  console.log(post);
  const [liked, setLiked] = useState<boolean>();
  const [likes, setLikes] = useState(post.totalLike || 0); // Initialize like count

  useEffect(() => {
    setLiked(post.liked);
  }, [post.liked]);

  const { mutate } = useMutation({
    mutationFn: toggleLikePost,
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: ["postDetail"] });

      const previous = queryClient.getQueryData(["postDetail"]);

      queryClient.setQueryData(["postDetail"], (old: any) => {
        return {
          ...old,
          totalLike: liked ? old.totalLike - 1 : old.totalLike + 1, // Optimistically update like count
        };
      });

      return { previous, postId };
    },
    onError: (_err, _postId, context) => {
      // Revert state back to previous in case of error
      if (context?.postId) {
        queryClient.setQueryData(["postDetail"], context.previous);
      }
    },
    onSettled: (_data, _err, _variables) => {
      // Refetch post data to sync with backend
      if (_variables?.postId) {
        queryClient.invalidateQueries({
          queryKey: ["postDetail", _variables.postId],
        });
      }
    },
  });

  // Handle Like button click
  const handleLike = () => {
    // Trigger the mutation to toggle like
    mutate({ postId: post._id });

    // Use the functional form to ensure the latest state is used
    setLiked((prevLiked) => {
      const newLikedState = !prevLiked;
      setLikes((prevLikes) => (newLikedState ? prevLikes + 1 : prevLikes - 1));
      return newLikedState;
    });
  };

  return (
    <div className="flex items-center gap-6">
      {/* View count with icon */}
      <div className="flex items-center gap-1">
        <Tooltip title="Lượt xem">
          <AiOutlineEye className="text-gray-500 dark:text-white !text-2xl" />
        </Tooltip>
        <span className="text-lg">{post.viewCount}</span>
      </div>

      {/* Comment count with icon */}
      <div className="flex items-center gap-1">
        <Tooltip title="Bình luận">
          <FaRegComments
            className="text-gray-500 dark:text-white !text-2xl cursor-pointer"
            onClick={() => onScrollComment()}
          />
        </Tooltip>
        <span className="text-lg">{post.totalComment}</span>
      </div>

      {/* Like button with icon */}
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={handleLike}
      >
        {liked ? (
          <Tooltip title="Bỏ yêu thích">
            <FaHeart className="text-purple-500 !text-xl" />
          </Tooltip>
        ) : (
          <Tooltip title="Yêu thích">
            <FaRegHeart className="text-gray-500 dark:text-white !text-xl" />
          </Tooltip>
        )}
        <span className="text-lg min-w-[15px]">{likes}</span>
      </div>
    </div>
  );
};

export default PostSummary;
