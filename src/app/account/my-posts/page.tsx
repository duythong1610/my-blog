"use client";

import { postApi } from "@/api/post.api";
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
    <div>
      <h1 className="text-2xl font-bold">Bài viết của tôi</h1>
      {posts.length === 0 ? (
        <p>Chưa có bài viết nào.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <PostItem post={post} />
          ))}
        </ul>
      )}
    </div>
  );
}
