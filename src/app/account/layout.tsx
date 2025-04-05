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
    key: "/account/favorite",
    label: "Yêu thích",
    icon: <BsEmojiHeartEyes className="text-2xl" />,
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
    <div className="flex min-h-screen max-w-7xl m-auto">
      {/* Sidebar */}
      <aside className="w-64 bg-white rounded-xl">
        <nav>
          <div className="my px-3">
            <div className="flex items-center gap-3">
              <Avatar src={user.info?.avatar} className="w-[60px] h-[60px]" />
              <div>
                <p className="font-bold">{user.info?.fullName}</p>
                <span className="font-medium text-gray-400">
                  {user.info?.rank}
                </span>
              </div>
            </div>
          </div>
          <ul className="mt-5">
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={`my-1.5 py-3 px-4 ${
                  pathname === item.key ? "bg-purple-50" : ""
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

      {/* Nội dung */}
      <main className="flex-1 pl-6">{children}</main>
      <ConfirmLogoutModal ref={confirmLogoutModalRef} />
    </div>
  );
}
