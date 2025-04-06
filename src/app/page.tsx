import HomeHero from "@/components/HomeHero";
import PostSection from "@/components/PostSection";

export const metadata = {
  title: "WriteFlow - Chia sẻ kiến thức, kết nối cộng đồng",
  description:
    "WriteFlow là cộng đồng nơi mọi lập trình viên – từ người mới bắt đầu đến chuyên gia – đều có thể chia sẻ kiến thức, kinh nghiệm thực tế và hành trình sự nghiệp, góp phần xây dựng một môi trường học hỏi tích cực và đầy cảm hứng.",
  keywords: [
    "WriteFlow",
    "lập trình",
    "chia sẻ kiến thức",
    "blog lập trình",
    "lập trình viên",
    "dev blog",
    "cộng đồng công nghệ",
    "học lập trình",
  ],
  openGraph: {
    title: "WriteFlow - Chia sẻ kiến thức, kết nối cộng đồng",
    description:
      "WriteFlow là cộng đồng nơi mọi lập trình viên – từ người mới bắt đầu đến chuyên gia – đều có thể chia sẻ kiến thức, kinh nghiệm thực tế và hành trình sự nghiệp, góp phần xây dựng một môi trường học hỏi tích cực và đầy cảm hứng.",
    url: "https://writeflow.whatdaporice.website",
    siteName: "WriteFlow",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WriteFlow - Chia sẻ kiến thức",
    description:
      "WriteFlow là cộng đồng nơi mọi lập trình viên – từ người mới bắt đầu đến chuyên gia – đều có thể chia sẻ kiến thức, kinh nghiệm thực tế và hành trình sự nghiệp, góp phần xây dựng một môi trường học hỏi tích cực và đầy cảm hứng.",
  },
};

export default function Home() {
  return (
    <div>
      <HomeHero />
      <div className="max-w-[1440px] m-auto pb-[200px]">
        <div className="flex md:flex-row flex-col-reverse gap-8">
          <PostSection />
        </div>
      </div>
    </div>
  );
}
