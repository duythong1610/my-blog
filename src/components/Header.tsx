"use client";

import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { Avatar } from "antd";
import { useAppSelector } from "@/lib/hook";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";
import Notification from "@/types/notification";
import { notificationApi } from "@/api/notifaction.api";
import logo from "@/assets/images/logo1.png";
import Image from "next/image";

export default function Header() {
  const user = useAppSelector((state) => state.user);

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
              <Link href="/" className="hover:text-blue-500">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-blue-500">
                Bài viết
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-500">
                Khóa học
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-500">
                Góp ý
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <UserMenu user={user.info} />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
