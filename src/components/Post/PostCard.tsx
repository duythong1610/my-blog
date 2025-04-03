import Image from "next/image";
import Link from "next/link";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Post } from "@/types/post";
import { formatDate } from "@/utils/date";

interface PropTypes {
  post: Post;
}

export default function PostCard({ post }: PropTypes) {
  return (
    <Link href={`/blog/${post._id}`}>
      <div className="bg-white rounded-[24px]">
        <div className="group relative overflow-hidden rounded-[24px]">
          <Image
            src={post.thumbnail}
            alt={""}
            width={300}
            height={200}
            className="object-cover h-[300px] w-full transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center gap-1">
            {post.tags.map((item) => (
              <div className="bg-purple-100 rounded-[8px] py-1 px-2 w-fit text-purple-500">
                {item.name}
              </div>
            ))}
          </div>
          <h2 className="font-extrabold text-2xl text-[#33404A]">
            {post.title}
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <CalendarOutlined />
              <span>{formatDate(post.createdAt)}</span>
            </div>{" "}
            |{" "}
            <div className="flex items-center gap-2">
              <ClockCircleOutlined />
              <span>5 phút đọc</span>
            </div>
          </div>
          <p className="text-gray-600">Khám phá thêm →</p>
        </div>
      </div>
    </Link>
  );
}
