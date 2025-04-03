"use client";

import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { Avatar } from "antd";
import { useAppSelector } from "@/lib/hook";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";
import Notification from "@/types/notification";
import { notificationApi } from "@/api/notifaction.api";

export default function Header() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const user = useAppSelector((state) => state.user);

  const handleGetNotifications = async () => {
    try {
      const { data } = await notificationApi.findAll({ page: 1, limit: 20 });
      setNotifications(data.notifications);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetNotifications();
  }, []);

  return (
    <header className="w-full p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          MyBlog
        </Link>

        {/* Menu */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-blue-500">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-500">
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <UserMenu user={user.info} notifications={notifications} />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
