"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Dropdown, Menu, Badge } from "antd";
import { UserOutlined, LogoutOutlined, BellOutlined } from "@ant-design/icons";
import { User } from "@/types/user";
import Notification from "@/types/notification";

interface UserMenuProps {
  user: User | null;
  onLogout?: () => void;
  notifications: Notification[]; // Mảng thông báo
}

export default function UserMenu({
  user,
  onLogout,
  notifications,
}: UserMenuProps) {
  const router = useRouter();

  if (!user) {
    return (
      <button
        onClick={() => router.push("/auth")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Đăng nhập
      </button>
    );
  }

  // Menu tài khoản
  const menu = (
    <Menu
      items={[
        {
          key: "account",
          label: "Tài khoản của tôi",
          icon: <UserOutlined />,
          onClick: () => router.push("/account"),
        },
        {
          key: "logout",
          label: "Đăng xuất",
          icon: <LogoutOutlined />,
          onClick: onLogout,
        },
      ]}
    />
  );

  // Menu thông báo
  const notificationMenu = (
    <Menu
      items={[
        ...notifications.map((notification, index) => ({
          key: notification._id,
          label: notification.message,
        })),
        {
          key: "view-all",
          label: "Xem tất cả",
          onClick: () => router.push("/notifications"),
        },
      ]}
    />
  );

  return (
    <div className="flex items-center gap-4">
      {/* Thông báo */}
      <Dropdown overlay={notificationMenu} trigger={["click"]}>
        <Badge count={notifications.length} offset={[-10, 10]}>
          <BellOutlined className="cursor-pointer text-xl" />
        </Badge>
      </Dropdown>

      {/* Avatar và Menu */}
      <Dropdown overlay={menu} trigger={["click"]}>
        <Avatar
          src={user.avatar}
          icon={!user.avatar && <UserOutlined />}
          className="cursor-pointer"
        />
      </Dropdown>
    </div>
  );
}
