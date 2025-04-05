import { Post } from "@/types/post";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";

interface PropTypes {
  post: Post;
  isShowStatus?: boolean;
}

export default function PostCard({ post, isShowStatus = false }: PropTypes) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-white dark:bg-[#222] rounded-[24px] border border-gray-200 dark:border-none shadow-md h-full">
        <div className="group relative overflow-hidden rounded-t-[24px]">
          <Image
            src={post.thumbnail}
            alt={""}
            width={300}
            height={200}
            className="object-cover h-[200px] w-full transition-transform duration-300 group-hover:scale-110"
          />

          {isShowStatus && (
            <div className="absolute top-4 right-4">
              <div
                className={`
        rounded-[8px] py-1 px-2 w-fit text-sm font-medium
        ${post.status == "pending" ? "bg-yellow-100 text-yellow-600" : ""}
        ${post.status === "approved" ? "bg-green-100 text-green-600" : ""}
        ${post.status === "rejected" ? "bg-red-100 text-red-600" : ""}
      `}
              >
                {post.status === "pending" && "Chờ duyệt"}
                {post.status === "approved" && "Đã duyệt"}
                {post.status === "rejected" && "Từ chối"}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center gap-1 flex-wrap">
            {post.tags.map((item) => (
              <div className="bg-purple-100 dark:bg-transparent dark:border dark:border-gray-200 rounded-[8px] py-1 px-2 w-fit text-purple-500 text-xs">
                {item.name}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Image
              width={50}
              height={50}
              src={post.author.avatar || ""}
              alt="writeflow_author_avatar"
              className="rounded-full object-cover w-[40px] h-[40px]"
            />
            <h2 className="font-extrabold text-lg text-[#33404A] dark:text-white">
              {post.title}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <CiCalendar />
              <span>{formatDate(post.createdAt)}</span>
            </div>{" "}
          </div>
          <p className="text-gray-600">Khám phá thêm →</p>
        </div>
      </div>
    </Link>
  );
}
