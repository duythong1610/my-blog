"use client";
import { usePost } from "@/hooks/usePost";
import PostCard from "./Post/PostCard";

const PostList = () => {
  const { posts, loadingPost } = usePost({
    initQuery: {
      page: 1,
      limit: 50,
    },
  });

  if (loadingPost) return "Loading...";

  return (
    <div className="flex-1">
      <h1 className="font-extrabold text-xl md:text-3xl text-[#050505] dark:text-white leading-[50px] md:mb-6">
        Tất cả bài viết
      </h1>
      {/* <CategoryFilter
        categories={tags} // Sử dụng tags từ Tanstack Query
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 md:gap-y-[48px]">
        {posts?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
