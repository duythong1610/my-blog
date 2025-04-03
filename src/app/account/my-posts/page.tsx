"use client";

import { postApi } from "@/api/post.api";
import PostCard from "@/components/Post/PostCard";
import PostItem from "@/components/PostItem";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";

export default function MyPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await postApi.findMyPost();

        setPosts(data.posts);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Đang tải bài viết...</p>;

  return (
    <div className="m-auto">
      <div className="mb-3">
        <h1 className="font-bold text-xl">Bài viết của tôi</h1>
      </div>
      {posts.length === 0 ? (
        <p>Chưa có bài viết nào.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-8 gap-y-[48px]">
          {posts.map((post, index) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
