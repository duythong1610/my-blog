"use client";

import { Post } from "@/types/post";
import { useState } from "react";
import { FaComment, FaHeart, FaRegComments, FaRegHeart } from "react-icons/fa"; // Icons for like/unlike
import { AiOutlineEye } from "react-icons/ai"; // Icon for views
const PostSummary = ({ post }: { post: Post }) => {
  // Sử dụng state để theo dõi lượt tim
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.totalLike || 0); // Assuming `likes` is part of the post data

  // Hàm để xử lý thay đổi trạng thái tim
  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1); // Update likes count
  };

  return (
    <div className="flex items-center gap-6">
      {/* Số người xem với icon */}
      <div className="flex items-center gap-1">
        <AiOutlineEye className="text-gray-500 !text-2xl" />
        <span className="text-lg">{post.viewCount || 283}</span>
      </div>

      {/* Số lượng comment với icon */}
      <div className="flex items-center gap-1">
        <FaRegComments className="text-gray-500 !text-2xl" />
        <span className="text-lg">{post.totalComment || 21}</span>
      </div>

      {/* Nút Like với icon có thể thay đổi */}

      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={handleLike}
      >
        {liked ? (
          <FaHeart className="text-purple-500 !text-xl" />
        ) : (
          <FaRegHeart className="text-gray-500 !text-xl" />
        )}
        <span className="text-lg min-w-[15px]">{likes}</span>
      </div>
    </div>
  );
};

export default PostSummary;
