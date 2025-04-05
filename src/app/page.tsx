import HomeHero from "@/components/HomeHero";
import PostList from "@/components/PostList";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "WriteFlow - Chia sẻ kiến thức, kết nối cộng đồng",
  description:
    "Nền tảng nơi bạn có thể khám phá, học hỏi và chia sẻ kiến thức qua các bài viết chất lượng.",
  openGraph: {
    title: "WriteFlow - Chia sẻ kiến thức, kết nối cộng đồng",
    description:
      "Nền tảng nơi bạn có thể khám phá, học hỏi và chia sẻ kiến thức qua các bài viết chất lượng.",
    url: "https://writeflow.whatdaporice.website/",
    siteName: "WriteFlow",
    images: [
      {
        url: "https://writeflow.whatdaporice.website/og-image.png",
        width: 1200,
        height: 630,
        alt: "WriteFlow - Chia sẻ kiến thức",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WriteFlow - Chia sẻ kiến thức",
    description:
      "Nơi bạn có thể khám phá, học hỏi và chia sẻ kiến thức qua các bài viết chất lượng.",
    images: ["https://writeflow.whatdaporice.website/og-image.png"],
  },
};

export default function Home() {
  return (
    <div>
      <HomeHero />
      <div className="max-w-[1440px] m-auto pb-[200px]">
        <div className="flex md:flex-row flex-col-reverse gap-8">
          <PostList />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
