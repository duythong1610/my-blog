import HomeHero from "@/components/HomeHero";
import PostList from "@/components/PostList";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="p-8">
      <HomeHero />

      <div className="max-w-[1440px] m-auto pb-[200px]">
        <div className="flex gap-8">
          <PostList />
          <Sidebar />
        </div>
      </div>
    </main>
  );
}
