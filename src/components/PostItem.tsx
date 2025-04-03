import { Post } from "@/types/post";
import Image from "next/image";
import { FaHeart, FaComment, FaEye } from "react-icons/fa";

interface PropsType {
  post: Post;
  onViewPost?: (post: Post) => void;
}

const PostItem = ({ post, onViewPost }: PropsType) => {
  return (
    <div className="flex items-start gap-[50px] px-[160px] py-20 bg-gray-900 rounded-xl">
      {/* Avatar */}
      <div className="flex items-center gap-4 min-w-[370px]">
        <Image
          width={48}
          height={48}
          src={post?.author?.avatar || ""}
          alt={post?.title}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-xl dark:text-white text-black">
            {post?.author?.fullName || ""}
          </h2>
          <p className="text-[#98989A]">Technology</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center gap-[50px]">
        <div className="flex flex-1 flex-col gap-[30px]">
          <p className="text-sm text-gray-400">10/01/2025</p>
          <div>
            <h2 className="text-lg font-semibold text-white">{post?.title}</h2>
            <p className="text-gray-400 line-clamp-2">{post?.content}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2 text-gray-500">
            <span className="flex items-center gap-1">
              <FaHeart className="text-red-500" /> {30}
            </span>
            <span className="flex items-center gap-1">
              <FaComment /> {30}
            </span>
            <span className="flex items-center gap-1">
              <FaEye /> {30}
            </span>
          </div>
        </div>
        <div className="w-fit" onClick={() => onViewPost?.(post)}>
          <button className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700">
            View Blog →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
