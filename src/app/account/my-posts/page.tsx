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

  return (
    <div className="m-auto">
      <div className="mb-3">
        <h1 className="font-bold text-xl">Bài viết của tôi</h1>
      </div>
      {posts?.length === 0 ? (
        <p>Chưa có bài viết nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 md:gap-y-[24px]">
          {loadingPost
            ? Array.from({ length: 6 }).map((_, index) => (
                <PostCard loading={true} key={index} post={{} as any} />
              ))
            : posts?.map((post) => (
                <PostCard
                  loading={false}
                  key={post._id}
                  post={post}
                  isShowStatus
                />
              ))}
        </div>
      )}
    </div>
  );
}
