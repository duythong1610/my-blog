import type { Metadata } from "next";
import "./globals.css";
import "@/styles/custom.scss";
import Header from "@/components/Header";
import { Raleway } from "next/font/google";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import ReduxProvider from "../providers/ReduxProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

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
    <ReduxProvider>
      <ReactQueryProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${raleway.className} bg-white dark:bg-black text-black dark:text-white`}
          >
            <ThemeProviderWrapper>
              <Header />
              <main className="container mx-auto p-4">{children}</main>
            </ThemeProviderWrapper>
          </body>
        </html>
      </ReactQueryProvider>
    </ReduxProvider>
  );
}
