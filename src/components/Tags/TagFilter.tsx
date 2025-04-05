"use client";

import { useTag } from "@/hooks/useTag";
import SearchBar from "../SearchBar";

export default function TagFilter() {
  const { tags, queryTag } = useTag({
    initQuery: { page: 1, limit: 50, hasPosts: true },
  });
  return (
    <>
      <SearchBar />
      <div className="bg-white dark:bg-[#222] p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-6 mt-8">Thẻ bài viết</h2>
        <ul className="flex flex-col gap-4">
          {tags?.map((tag) => (
            <li
              key={tag._id}
              className="hover:underline cursor-pointer hover:text-purple-500"
            >
              <div className="flex items-center justify-between">
                <span>{tag.name}</span>
                <span>{tag.totalPosts > 0 ? tag.totalPosts : ""}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
