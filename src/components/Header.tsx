"use client";

import logo from "@/assets/images/logo.png";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";

export default function Header() {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <header className="w-full p-4  m-auto fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0e100f] shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-base font-black uppercase">
          <div className="flex items-center">
            <Image
              src={logo}
              alt={""}
              width={50}
              className="object-contain"
              style={{ filter: theme == "dark" ? "invert(1)" : "" }}
            />{" "}
            WriteFlow
          </div>
        </Link>

        {/* Menu */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className={`font-medium hover:text-purple-500 ${
                  pathname === "/" ? " text-purple-500 !font-bold" : ""
                }`}
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                href="/post"
                className={`font-medium hover:text-purple-500 ${
                  pathname === "/post" ? " text-purple-500 !font-bold" : ""
                }`}
              >
                Bài viết
              </Link>
            </li>
            <li>
              <Link
                href="/question"
                className={`font-medium hover:text-purple-500 ${
                  pathname === "/about" ? " text-purple-500 !font-bold" : ""
                }`}
              >
                Hỏi đáp
              </Link>
            </li>
            <li>
              <Link
                href="/course"
                className={`font-medium hover:text-purple-500 ${
                  pathname === "/course" ? " text-purple-500 !font-bold" : ""
                }`}
              >
                Khóa học
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
