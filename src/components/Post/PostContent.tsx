"use client";
import { getPostDetail } from "@/app/blog/[slug]/page";
import { useHeadsObserver } from "@/hooks/useHeadsObserver";
import { Post } from "@/types/post";
import { formatDate } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { Collapse, CollapseProps } from "antd";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineExpandMore } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import MarkdownRenderer from "../MarkdownRendered";

interface PropsType {
  post: Post;
  slug: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

const PostContent = ({ post, slug }: PropsType) => {
  const { data, isLoading } = useQuery<Post>({
    queryKey: ["postDetail"],
    queryFn: () => getPostDetail(slug),
    refetchOnWindowFocus: false,
    gcTime: Infinity,
    initialData: post,
  });

  const [headings, setHeadings] = useState<Heading[]>([]);
  const { activeId, handleScroll } = useHeadsObserver(
    headings.map(({ id }) => id)
  );

  // Handler for when headings are extracted from markdown
  const handleHeadingsExtracted = (extractedHeadings: Heading[]) => {
    setHeadings(extractedHeadings);
  };

  console.log(headings);

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <label htmlFor="" className="text-xl font-bold dark:text-white">
            Nội dung bài viết
          </label>
        </div>
      ),
      children: (
        <>
          <ul className="space-y-2 mb-6">
            {headings.map(({ id, text, level }) => (
              <li key={id} style={{ paddingLeft: level === 3 ? 20 : 0 }}>
                <a
                  href={`#${id}`}
                  className="hover:underline hover:!text-purple-500 text-base font-medium dark:text-gray-400"
                  // style={{ color: activeId === id ? "#15AA7A" : "#33404A" }}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                      handleScroll(id);
                    }
                  }}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
          {/* <div className="flex flex-col gap-8">
            <PromoBanner type="tag" />
            <PromoBanner />
          </div> */}
        </>
      ),
    },
  ];

  if (!data) return "Bài viết không tồn tại";

  return (
    <div className="flex gap-6">
      {/* Blog Content */}
      <div className="w-[70%] pr-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1">
            {post.tags.map((item) => (
              <div className="bg-purple-100 rounded-[8px] py-1 px-2 w-fit text-purple-500">
                {item.name}
              </div>
            ))}
          </div>
          <h1 className="text-[36px] font-extrabold">{post.title}</h1>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  className="object-cover rounded-full w-[64px] h-[64px]"
                  src={post.author.avatar || ""}
                  alt={"author_avatar"}
                  width={64}
                  height={64}
                />
                <div>
                  <span>Tác giả</span>
                  <p className="text-[#33404A] font-bold">
                    {post.author?.fullName}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <CiCalendar />
                <span>Cập nhật lúc: {formatDate(post.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Use updated MarkdownRenderer with heading extraction */}
        <MarkdownRenderer
          content={post.content}
          onHeadingsExtracted={handleHeadingsExtracted}
        />
      </div>

      <div className="sticky top-[50px] h-max p-4 max-w-[400px] w-[30%]">
        <Collapse
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <FaChevronDown
              className="!text-xl"
              style={{ rotate: isActive ? "180deg" : "0deg" }}
            />
          )}
          defaultActiveKey={["1"]}
          bordered={false}
          items={items}
          className="w-[400px]"
        ></Collapse>
      </div>
    </div>
  );
};

export default PostContent;
