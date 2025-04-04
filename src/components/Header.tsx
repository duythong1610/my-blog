"use client";

import logo from "@/assets/images/logo.png";
import { useAppSelector } from "@/lib/hook";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full p-4 max-w-7xl m-auto">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-base font-black uppercase">
          <div className="flex items-center">
            <Image src={logo} alt={""} width={50} className="object-contain" />{" "}
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
                href="/course"
                className={`font-medium hover:text-purple-500 ${
                  pathname === "/course" ? " text-purple-500 !font-bold" : ""
                }`}
              >
                Khóa học
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`font-medium hover:text-purple-500 ${
                  pathname === "/about" ? " text-purple-500 !font-bold" : ""
                }`}
              >
                Góp ý
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
