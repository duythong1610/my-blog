"use client";

import { useTag } from "@/hooks/useTag";
import magnifyingGlassIcon from "@/assets/icons/MagnifyingGlass.svg";
import Image from "next/image";
import { useState } from "react";

interface PropsType {
  onSearch: (keyword: string) => void;
  onTagClick: (tagId: string) => void;
}

export default function FilterSidebar({ onSearch, onTagClick }: PropsType) {
  const [keyword, setKeyword] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const { tags } = useTag({
    initQuery: { page: 1, limit: 50, hasPosts: true },
  });

  // Hàm xử lý sự kiện nhấn Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(keyword);
    }
  };

  // Hàm xử lý sự kiện nhấn vào icon tìm kiếm
  const handleIconClick = () => {
    onSearch(keyword);
  };

  const handleTagClick = (tagId: string) => {
    setActiveTag(tagId); // Cập nhật tag được chọn
    onTagClick(tagId); // Cập nhật query tìm kiếm với tag được chọn
  };

  return (
    <div className="w-full md:w-[366px] md:sticky top-[88px] h-max">
      <div className="bg-white dark:bg-[#222] shadow-md dark:shadow-none p-5 rounded-lg">
        <div className="mb-2">
          <div className="rounded-lg">
            <div className="flex items-center justify-between gap-10">
              <input
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  if (e.target.value) {
                    setKeyword(e.target.value);
                  } else {
                    onSearch("");
                  }
                }}
                type="text"
                placeholder="Tìm kiếm bài viết..."
                className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none border-none dark:bg-transparent"
              />
              <div
                className="bg-purple-500 p-3 rounded-[12px] w-fit cursor-pointer"
                onClick={handleIconClick}
              >
                <Image
                  src={magnifyingGlassIcon}
                  alt={"icon"}
                  width={24}
                  height={24}
                ></Image>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-lg font-bold mb-6 mt-8">Thẻ bài viết</h2>
        <ul className="flex flex-col gap-4">
          {tags?.map((tag) => (
            <li
              key={tag._id}
              onClick={() => handleTagClick(tag._id)} // Khi nhấn vào tag
              className={`cursor-pointer hover:text-purple-500 ${
                activeTag === tag._id
                  ? "text-purple-500 font-medium"
                  : "hover:underline"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{tag.name}</span>
                <span>{tag.totalPosts > 0 ? tag.totalPosts : ""}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
