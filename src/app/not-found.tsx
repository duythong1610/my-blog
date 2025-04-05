"use client";

import Image from "next/image";
import NotfoundImg from "@/assets/images/404.png";
import { useTheme } from "next-themes";

export default function NotFound() {
  const { theme } = useTheme();
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-110px)]">
        <p className="text-3xl  font-bold">
          Oops! Trang bạn tìm kiếm không tồn tại.
        </p>
        <Image
          src={NotfoundImg}
          alt={""}
          width={400}
          height={300}
          className="w-[600px]"
          style={{ filter: theme == "dark" ? "invert(1)" : "" }}
        />
        <a
          href="/"
          className="mt-10 px-6 py-1 bg-purple-600 text-white rounded-[20px] text-lg shadow-md hover:bg-purple-700 transition"
        >
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
}
