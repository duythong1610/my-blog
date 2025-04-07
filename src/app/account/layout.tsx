"use client";

import { useAppSelector } from "@/lib/hook";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useRef } from "react";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { LuLogOut, LuNotebookPen } from "react-icons/lu";

import ConfirmLogoutModal, {
  ConfirmLogoutModalRef,
} from "@/components/Modal/ConfirmLogoutModal";
import { FaHeart } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
interface MenuItem {
  key: string;
  label: string;
  icon: ReactNode;
}

const menuItems: MenuItem[] = [
  {
    key: "/account/profile",
    label: "Tài khoản của tôi",
    icon: <UserOutlined className="text-2xl" />,
  },
  {
    key: "/account/my-posts",
    label: "Bài viết của tôi",
    icon: <LuNotebookPen className="text-2xl" />,
  },
  {
    key: "/account/liked-posts",
    label: "Yêu thích",
    icon: <IoMdHeartEmpty className="text-2xl" />,
  },
  {
    key: "/account/logout",
    label: "Đăng xuất",
    icon: <LuLogOut className="text-2xl" />,
  },
];

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.user);

  const confirmLogoutModalRef = useRef<ConfirmLogoutModalRef>();

  return (
    <div className="flex md:flex-row flex-col min-h-screen max-w-7xl m-auto">
      {/* Sidebar */}
      <aside className="w-64 hidden md:block">
        <nav>
          <div className="my px-3">
            <div className="flex items-center md:gap-3 gap-2">
              <Avatar
                src={user.info?.avatar}
                className="w-10 h-10 md:w-[60px] md:h-[60px]"
              />
              <div>
                <p className="font-bold md:text-base text-sm">
                  {user.info?.fullName}
                </p>
                <span className="font-medium text-gray-400 md:text-base text-sm">
                  {user.info?.rank}
                </span>
              </div>
            </div>
          </div>
          <ul className="mt-5">
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={`my-[2px] md:my-1.5 py-2 md:py-3 px-4 md:text-base text-sm ${
                  pathname === item.key ? "bg-purple-50 dark:bg-[#222]" : ""
                }`}
              >
                {item.key === "/account/logout" ? (
                  <button
                    className={`link font-medium ${
                      pathname === item.key ? "text-purple-500" : ""
                    }`}
                    onClick={() => confirmLogoutModalRef.current?.handleOpen()}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </div>
                  </button>
                ) : (
                  <Link
                    className={`link font-medium ${
                      pathname === item.key ? " text-purple-500" : ""
                    }`}
                    href={item.key}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <nav className="fixed bottom-[10px] left-4 right-4 z-50 bg-black dark:text-white dark:bg-[#111] rounded-[40px]  md:hidden">
        <ul className="flex justify-between items-center py-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.key;
            const classes = isActive
              ? "text-purple-500 font-semibold"
              : "text-gray-500 dark:text-gray-400";

            return (
              <li key={item.key} className="flex-1 text-center">
                {item.key === "/account/logout" ? (
                  <button
                    onClick={() => confirmLogoutModalRef.current?.handleOpen()}
                    className={`flex flex-col items-center justify-center w-full ${classes}`}
                  >
                    <div className="text-lg">{item.icon}</div>
                    <span className="text-xs line-clamp-1">{item.label}</span>
                  </button>
                ) : (
                  <Link
                    href={item.key}
                    className={`flex flex-col items-center justify-center w-full ${classes}`}
                  >
                    <div className="text-lg">{item.icon}</div>
                    <span className="text-xs line-clamp-1 max-w-[70px]">
                      {item.label}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Nội dung */}
      <main className="flex-1 md:pl-6">{children}</main>
      <ConfirmLogoutModal ref={confirmLogoutModalRef} />
    </div>
  );
}
