import Header from "@/components/Header";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "@/styles/custom.scss";
import { Raleway } from "next/font/google";
import ReduxProvider from "../providers/ReduxProvider";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { headers } from "next/headers";
import SessionProviderWrapper from "@/providers/SessionProviderWrapper";
import dynamic from "next/dynamic";
import FollowCursor from "@/components/FollowCursor";

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
  loading: () => <div>Loading footer...</div>,
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "WriteFlow - Chia sẻ kiến thức, kết nối cộng đồng",
  icons: {
    icon: "/favicon.png",
  },
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
    url: "https://writeflow.asia",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReduxProvider>
        <ReactQueryProvider>
          <body
            className={`${raleway.className} bg-white dark:bg-[#0e100f] text-black dark:text-white !p-0`}
          >
            <FollowCursor color="#BA55D3AA" />
            <SessionProviderWrapper>
              <NextTopLoader color="#a855f7" />
              <ThemeProvider attribute="data-mode">
                <ThemeProviderWrapper>
                  <Header />
                  <main className="container mx-auto p-4 pt-[100px]">
                    {children}
                  </main>
                  <Footer />
                </ThemeProviderWrapper>
              </ThemeProvider>
            </SessionProviderWrapper>
          </body>
        </ReactQueryProvider>
      </ReduxProvider>
    </html>
  );
}
