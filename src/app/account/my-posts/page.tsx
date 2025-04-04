"use client";

import PostCard from "@/components/Post/PostCard";
import { useMyPost } from "@/hooks/useMyPost";

export default function MyPostsPage() {
  const { loadingPost, posts } = useMyPost({
    initQuery: {
      page: 1,
      limit: 10,
    },
  });
  if (loadingPost) return <p>Đang tải bài viết...</p>;

  return (
    <div className="m-auto">
      <div className="mb-3">
        <h1 className="font-bold text-xl">Bài viết của tôi</h1>
      </div>
      {posts?.length === 0 ? (
        <p>Chưa có bài viết nào.</p>
      ) : (
        <div className="grid grid-cols-3 gap-x-6 gap-y-[48px]">
          {posts?.map((post) => (
            <PostCard key={post._id} post={post} isShowStatus />
          ))}
        </div>
      )}
    </div>
  );
}
