"use client";

import React, { useEffect, useState } from "react";
import { Collapse, CollapseProps } from "antd";
import { FaChevronDown } from "react-icons/fa";
import { useHeadsObserver } from "@/hooks/useHeadsObserver";

interface PostTableOfContentsProps {
  content: string; // Nhận trực tiếp nội dung markdown
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

const PostTableOfContents: React.FC<PostTableOfContentsProps> = ({
  content,
}) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const { handleScroll } = useHeadsObserver(headings.map(({ id }) => id));

  // Trích xuất headings từ nội dung markdown khi component được mount
  useEffect(() => {
    // Regex để tìm các tiêu đề từ H2-H3 trong markdown
    const regex = /^(#{2,3})\s+(.+)$/gm;
    const extractedHeadings: Heading[] = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      const level = match[1].length; // Số lượng dấu #
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Loại bỏ các ký tự đặc biệt
        .replace(/\s+/g, "-"); // Thay thế khoảng trắng bằng dấu gạch ngang

      extractedHeadings.push({
        id,
        text,
        level,
      });
    }

    setHeadings(extractedHeadings);
  }, [content]);

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

  return (
    <div className="md:sticky md:top-[100px] md:h-max md:p-4 md:max-w-[400px] w-full md:w-[30%]">
      <Collapse
        expandIconPosition="right"
        expandIcon={({ isActive }) => (
          <FaChevronDown
            className="!text-xl dark:fill-white"
            style={{ rotate: isActive ? "180deg" : "0deg" }}
          />
        )}
        defaultActiveKey={["1"]}
        bordered={false}
        items={items}
        className="w-full md:w-[400px] bg-gray-50 dark:bg-[#222]"
      />
    </div>
  );
};

export default PostTableOfContents;
