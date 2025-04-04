"use client";
import { usePost } from "@/hooks/usePost";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import PostItem from "./PostItem";
import PostCard from "./Post/PostCard";

const PostList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const router = useRouter();
  const {
    posts,
    debounceSearchPost,
    fetchPost,
    queryPost,
    totalPost,
    loadingPost,
  } = usePost({
    initQuery: {
      page: 1,
      limit: 50,
    },
  });

  if (loadingPost) return "Loading...";

  return (
    <div className="flex-1">
      <h1 className="font-extrabold text-3xl text-[#050505] leading-[72px] mb-6">
        Tất cả bài viết
      </h1>
      {/* <CategoryFilter
        categories={tags} // Sử dụng tags từ Tanstack Query
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      /> */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-[48px]">
        {posts?.map((post, index) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
