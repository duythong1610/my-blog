"use client";

import PostCard from "@/components/Post/PostCard";
import { useMyPost } from "@/hooks/useMyPost";
import { usePostsByUser } from "@/hooks/usePostsByUser";

export default function UserPost({ userId }: { userId: string }) {
  const { loadingPost, posts } = usePostsByUser({
    initQuery: {
      page: 1,
      limit: 10,
      userId: userId,
    },
  });

  if (loadingPost) return <p>Đang tải bài viết...</p>;

  return (
    <div className="m-auto">
      <div className="mb-3">
        <h1 className="font-bold text-lg">Bài viết</h1>
      </div>
      {posts?.length === 0 ? (
        <p>Chưa có bài viết nào.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-[48px]">
          {posts?.map((post, index) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
