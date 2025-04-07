"use client";

import PostCard from "@/components/Post/PostCard";
import { useLikedPost } from "@/hooks/useLikedPost";

export default function MyPostsPage() {
  const { loadingPost, posts } = useLikedPost({
    initQuery: {
      page: 1,
      limit: 10,
    },
  });

  return (
    <div className="m-auto">
      <div className="mb-3">
        <h1 className="font-bold text-xl">Bài viết yêu thích</h1>
      </div>
      {posts?.length === 0 ? (
        <p>Chưa có bài viết nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 md:gap-y-[48px]">
          {posts?.map((post) => (
            <PostCard loading={loadingPost} key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
