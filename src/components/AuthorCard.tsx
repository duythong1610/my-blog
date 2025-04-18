import FollowAction from "@/app/user/components/FollowAction";
import { User } from "@/types/user";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { FaRegComments, FaRegHeart } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { SlUserFollowing } from "react-icons/sl";

interface PropTypes {
  author: User;
}

export default function AuthorCard({ author }: PropTypes) {
  return (
    <div className="bg-white dark:bg-[#222] rounded-xl p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/user/${author.username}`}>
            <Image
              src={author.avatar || ""}
              alt={""}
              width={200}
              height={200}
              className="w-[100px] h-[100px] rounded-xl object-cover"
            />
          </Link>
          <div className="flex flex-col gap-3">
            <div>
              <Link href={`/user/${author.username}`}>
                <h1 className="font-bold text-lg">{author.fullName}</h1>
              </Link>
              <Link href={`/user/${author.username}`} key={author._id}>
                <span className="text-gray-400 font-medium">
                  @{author.username}
                </span>
              </Link>
            </div>
            <div>
              <FollowAction key={author._id} userId={author._id} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-5 gap-y-1 mt-5 flex-wrap">
        {/* View count with icon */}
        <div className="flex items-center gap-1 leading-[20px]">
          <Tooltip title="Tổng bài viết">
            <LuNotebookPen className="text-gray-500 dark:text-white !text-[20px]" />
          </Tooltip>
          <span className="!text-[18px]">{author.totalPosts}</span>
        </div>
        <div className="flex items-center gap-1 leading-[20px]">
          <Tooltip title="Tổng lượt xem">
            <AiOutlineEye className="text-gray-500 dark:text-white !text-[24px]" />
          </Tooltip>
          <span className="!text-[18px]">{author.totalViews}</span>
        </div>

        <div className="flex items-center gap-1 leading-[20px]">
          <Tooltip title="Tổng bình luận">
            <FaRegComments className="text-gray-500 dark:text-white !text-[24px]" />
          </Tooltip>
          <span className="!text-[18px]">{author.totalComments}</span>
        </div>

        {/* Like button with icon */}
        <div className="flex items-center gap-1 leading-[20px]">
          <Tooltip title="Tổng yêu thích">
            <FaRegHeart className="text-gray-500 dark:text-white !text-[20px]" />
          </Tooltip>

          <span className="!text-[18px] min-w-[15px]">{author.totalLikes}</span>
        </div>
        <div className="flex items-center gap-1 leading-[20px]">
          <Tooltip title="Tổng theo dõi">
            <SlUserFollowing className="text-gray-500 dark:text-white !text-[20px]" />
          </Tooltip>

          <span className="!text-[18px] min-w-[15px]">
            {author.totalFollowers}
          </span>
        </div>
      </div>
    </div>
  );
}
