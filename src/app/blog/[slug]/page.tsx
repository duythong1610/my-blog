"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import MarkdownRenderer from "@/components/MarkdownRendered";
import { postApi } from "@/api/post.api";

const BlogDetailPage = () => {
  const { slug } = useParams(); // Lấy ID từ URL
  const [post, setPost] = useState<{ title: string; content: string } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    setLoading(true);

    try {
      const response = await postApi.findOne(slug.toString());
      setPost(response.data);
    } catch (err) {
      setError("Không thể tải bài viết!");
    } finally {
      setLoading(false);
    }
  };

  console.log(slug);
  useEffect(() => {
    if (slug) fetchPost();
  }, [slug]);

  if (loading) return <p>Đang tải bài viết...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>Không tìm thấy bài viết!</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <MarkdownRenderer content={post.content} />
    </div>
  );
};

export default BlogDetailPage;
