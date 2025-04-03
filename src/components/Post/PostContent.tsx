"use client";
import { getPostDetail } from "@/app/blog/[slug]/page";
import { useHeadsObserver } from "@/hooks/useHeadsObserver";
import { Post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import { Collapse, CollapseProps } from "antd";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import MarkdownRenderer from "../MarkdownRendered";

interface PropsType {
  post: Post;
  slug: string;
}

const PostContent = ({ post, slug }: PropsType) => {
  const { data, isLoading, isFetching, isError, error, status, refetch } =
    useQuery<Post>({
      queryKey: ["postDetail"],
      queryFn: () => getPostDetail(slug),
      refetchOnWindowFocus: false,
      gcTime: Infinity,
      initialData: post,
    });

  const contentRef = useRef<HTMLDivElement>(null);

  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const { activeId, handleScroll } = useHeadsObserver(
    headings.map(({ id }) => id)
  );

  useEffect(() => {
    if (post?.content) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = post.content;
      const elements = Array.from(tempDiv.querySelectorAll("h2, h3"));

      const newHeadings = elements.map((el, index) => {
        const id = `heading-${index}`;
        el.id = id; // Thêm ID vào thẻ
        return {
          id,
          text: el.textContent || "",
          level: el.tagName === "H2" ? 1 : 2,
        };
      });

      setHeadings(newHeadings);
    }
  }, [post?.content]);

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <label htmlFor="" className="text-2xl font-bold ">
            Nội dung bài viết
          </label>
        </div>
      ),
      children: (
        <>
          <ul className="space-y-2 mb-6">
            {headings.map(({ id, text, level }) => (
              <li key={id} style={{ paddingLeft: level === 2 ? 20 : 0 }}>
                <a
                  href={`#${id}`}
                  className="hover:underline hover:!text-[#15AA7A] text-lg font-medium"
                  style={{ color: activeId == id ? "#15AA7A" : "#33404A" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(id);
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
      <div className="flex-1 pr-6">
        <div className="flex flex-col gap-4">
          <div className="bg-[#E2F0FE] rounded-[8px] py-1 px-2 w-fit text-[#0F4F9E]">
            {post.title}
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
                <span>Cập nhật lúc: 12/03/2025</span>
              </div>{" "}
              |{" "}
              <div className="flex items-center gap-2">
                <CiClock2 />
                <span>5 phút đọc</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          ref={contentRef}
          className="mt-6 prose
        "
          dangerouslySetInnerHTML={{ __html: processedContent }}
        /> */}

        <MarkdownRenderer content={post.content} />

        {/* <PostReactions /> */}
      </div>

      {/* Sidebar Table of Contents */}
      <div className="sticky top-[88px] h-max p-4 w-[30%] max-w-[400px]">
        <Collapse
          expandIconPosition="right"
          //   expandIcon={({ isActive }) => (
          //     <Image
          //       src={"caretDownIcon"}
          //       alt={""}
          //       width={24}
          //       height={24}
          //       style={{ rotate: isActive ? "180deg" : "0deg" }}
          //     />
          //   )}
          defaultActiveKey={["1"]}
          bordered={false}
          items={items}
        ></Collapse>
      </div>
    </div>
  );
};

export default PostContent;
