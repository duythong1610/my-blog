import { Post } from "@/types/post";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import registerIcon from "@/assets/icons/register.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BsPencil } from "react-icons/bs";

interface PropTypes {
  post: Post;
  isShowStatus?: boolean;
  isShowEdit?: boolean;
  loading: boolean;
}

export default function PostCard({
  post,
  isShowStatus = false,
  isShowEdit = false,
  loading,
}: PropTypes) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-[#222] rounded-[24px] border border-gray-200 dark:border-none shadow-md h-full flex flex-col leading-none">
        <div className="group overflow-hidden rounded-t-[24px]">
          <Skeleton height={200} width="100%" />
        </div>
        <div className="flex-1 flex flex-col justify-between p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1 flex-wrap">
              <Skeleton width={80} height={20} />
            </div>
            <div className="flex gap-3 items-center">
              <Skeleton circle width={40} height={40} />
              <Skeleton width={200} height={20} />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <Skeleton width={100} height={20} />
            <Skeleton width={120} height={30} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group bg-white dark:bg-[#222] rounded-[24px] border border-gray-200 dark:border-none shadow-md h-full flex flex-col">
      {isShowEdit && (
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Link
            href={`/post/edit/${post.slug}`}
            className="flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white text-sm px-3 py-1 rounded-[8px] font-semibold shadow"
          >
            <BsPencil size={14} />
            Chỉnh sửa
          </Link>
        </div>
      )}
      <div className="group relative overflow-hidden rounded-t-[24px] h-[200px]">
        <Link href={`/blog/${post.slug}`} className="h-full block">
          <Image
            src={post.thumbnail}
            alt=""
            width={300}
            height={200}
            className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
        {isShowStatus && (
          <div className="absolute top-4 right-4">
            <div
              className={`rounded-[8px] py-1 px-2 w-fit text-sm font-medium
                ${
                  post.status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : ""
                }
                ${
                  post.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : ""
                }
                ${post.status === "rejected" ? "bg-red-100 text-red-600" : ""}`}
            >
              {post.status === "pending" && "Chờ duyệt"}
              {post.status === "approved" && "Đã duyệt"}
              {post.status === "rejected" && "Từ chối"}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col p-4">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-1 flex-wrap max-h-[60px] overflow-hidden">
            {post.tags.map((item) => (
              <div
                key={item._id}
                className="bg-purple-50 dark:bg-transparent dark:border dark:border-gray-200 rounded-[8px] py-1 px-2 w-fit text-purple-500 text-xs"
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <Image
              width={100}
              height={100}
              src={post.author.avatar || ""}
              alt={post.author.fullName || "writeflow_author_avatar"}
              className="rounded-full object-cover w-[40px] h-[40px]"
            />
            <Link
              href={`/blog/${post.slug}`}
              className="hover:underline flex-1"
            >
              <h2 className="font-extrabold text-lg text-[#33404A] dark:text-white line-clamp-2 h-[56px]">
                {post.title}
              </h2>
            </Link>
          </div>
        </div>

        <div className="flex-grow"></div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white">
            <CiCalendar />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <Link href={`/blog/${post.slug}`}>
            <div className="bg-[#1AD598] w-fit border-none text-xs text-white hover:bg-green-400 rounded-[40px] py-1 px-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="text-[#052B1E] font-bold">Xem bài viết</span>
                <Image src={registerIcon} alt="" width={18} height={18} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
