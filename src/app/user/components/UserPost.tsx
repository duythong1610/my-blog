"use client";

import PostCard from "@/components/Post/PostCard";
import { usePostsByUser } from "@/hooks/usePostsByUser";
import { Pagination } from "antd";

export default function UserPost({ userId }: { userId: string }) {
  const { loadingPost, posts, queryPost, setQueryPost, totalPost } =
    usePostsByUser({
      initQuery: {
        page: 1,
        limit: 9,
        userId: userId,
      },
    });

  const handlePageChange = (page: number) => {
    setQueryPost((prevQuery) => ({ ...prevQuery, page }));
  };

  return (
    <div className="m-auto">
      <div className="mb-3">
        <h1 className="font-bold text-lg">Bài viết</h1>
      </div>
      {posts?.length === 0 ? (
        <p className="text-center">Chưa có bài viết nào.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-[24px]">
            {loadingPost
              ? Array.from({ length: 6 }).map((_, index) => (
                  <PostCard loading={true} key={index} post={{} as any} />
                ))
              : posts?.map((post) => (
                  <PostCard loading={false} key={post._id} post={post} />
                ))}
          </div>
          <div className="flex justify-center mt-10">
            <Pagination
              current={queryPost.page}
              pageSize={queryPost.limit}
              total={totalPost}
              onChange={handlePageChange}
              showSizeChanger={false}
              hideOnSinglePage={true}
            />
          </div>
        </>
      )}
    </div>
  );
}
