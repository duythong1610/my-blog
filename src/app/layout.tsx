import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "@/styles/custom.scss";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import ReduxProvider from "../providers/ReduxProvider";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/assets/images/logo.png",
  },
  title: "WriteFlow",
  description:
    "Chia sẻ kiến thức, kết nối cộng đồng – Nơi mỗi bài viết là một hành trình học hỏi!",
};

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

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
            className={`${raleway.className} bg-white dark:bg-[#0e100f] text-black dark:text-white`}
          >
            <ThemeProviderWrapper>
              <Header />
              <main className="container mx-auto p-4 pt-[100px]">
                {children}
              </main>
              <Footer />
            </ThemeProviderWrapper>
          </body>
        </ReactQueryProvider>
      </ReduxProvider>
    </html>
  );
}
