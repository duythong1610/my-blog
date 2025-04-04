import Image from "next/image";
import Link from "next/link";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Post } from "@/types/post";
import { formatDate } from "@/utils/date";

interface PropTypes {
  post: Post;
  isShowStatus?: boolean;
}

export default function PostCard({ post, isShowStatus = false }: PropTypes) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-white rounded-[24px] border border-gray-200 shadow-md h-full">
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
              <div className="bg-purple-100 rounded-[8px] py-1 px-2 w-fit text-purple-500 text-xs">
                {item.name}
              </div>
            ))}
          </div>
          <h2 className="font-extrabold text-lg text-[#33404A]">
            {post.title}
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <CalendarOutlined />
              <span>{formatDate(post.createdAt)}</span>
            </div>{" "}
          </div>
          <p className="text-gray-600">Khám phá thêm →</p>
        </div>
      </div>
    </Link>
  );
}
