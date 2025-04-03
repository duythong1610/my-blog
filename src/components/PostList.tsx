"use client";
import { postApi } from "@/api/post.api";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import PostItem from "./PostItem";
import { useRouter } from "next/navigation";

const blogs = [
  {
    author: "John Techson",
    category: "Quantum Computing",
    date: "October 15, 2023",
    title: "The Quantum Leap in Computing",
    description: "Explore the revolution in quantum computing...",
    likes: "24.5k",
    comments: "50",
    views: "20",
    avatar: "/avatars/john.png",
  },
  {
    author: "Sarah Ethicist",
    category: "AI Ethics",
    date: "November 5, 2023",
    title: "The Ethical Dilemmas of AI",
    description: "A deep dive into ethical challenges posed by AI...",
    likes: "32k",
    comments: "72",
    views: "18",
    avatar: "/avatars/sarah.png",
  },
  {
    author: "Astronomer X",
    category: "Space Exploration",
    date: "December 10, 2023",
    title: "The Mars Colonization Challenge",
    description: "Exploring the technical challenges of Mars...",
    likes: "20k",
    comments: "31",
    views: "12",
    avatar: "/avatars/astro.png",
  },
];

const categories = blogs.map((blog) => blog.category);

const PostList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  const handleGetPost = async () => {
    try {
      const { data } = await postApi.findAll({ page: 1, limit: 10 });
      setPosts(data.posts);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetPost();
  }, []);

  return (
    <section className="mx-auto">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="space-y-6">
        {posts.map((post, index) => (
          <PostItem
            key={index}
            post={post}
            onViewPost={(post) => router.push(`/blog/${post._id}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default PostList;
