import PostList from "@/components/PostList";

export default function Home() {
  return (
    <main className="p-8 min-h-screen">
      <h1 className="text-2xl font-bold">Latest Blog Posts</h1>
      <PostList />
    </main>
  );
}
