"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Dropdown, Menu, Badge } from "antd";
import { UserOutlined, LogoutOutlined, BellOutlined } from "@ant-design/icons";
import { User } from "@/types/user";
import Notification from "@/types/notification";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GrLinkNext } from "react-icons/gr";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNotification } from "@/hooks/useNotification";
import NotificationItem from "./Notification/NotificationItem";
import Image from "next/image";
import Link from "next/link";

interface UserMenuProps {
  user: User | null;
  onLogout?: () => void;
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const router = useRouter();

  const {
    notifications,
    fetchNotification,
    debounceSearchNotification,
    loadingNotification,
    queryNotification,
    totalNotification,
    setQueryNotification,
  } = useNotification({
    initQuery: {
      page: 1,
      limit: 50,
    },
  });

  if (!user) {
    return (
      <Link href="/auth">
        <div className="bg-purple-500 border-none text-white hover:bg-purple-400 rounded-[40px] py-2 px-3 cursor-pointer">
          <div className="flex items-center gap-3">
            <span className="font-bold">Đăng nhập</span>
          </div>
        </div>
      </Link>
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
    <div className="w-[350px] bg-white dark:bg-black rounded-lg shadow-xl py-3 px-2">
      <div className="flex items-center justify-between mt-2 px-3">
        <h1 className="text-base font-bold ">Thông báo</h1>
        <span className="text-purple-500 font-medium text-sm cursor-pointer">
          Đánh dấu là đã đọc
        </span>
      </div>
      {notifications.length > 0 ? (
        <InfiniteScroll
          className="flex flex-col gap-4 h-[450px] max-h-[450px] overflow-y-auto mt-5 px-3"
          dataLength={notifications.length}
          next={fetchNotification}
          hasMore={false}
          loader={<h4>Loading...</h4>}
          height={650}
        >
          {notifications.map((item) => (
            <NotificationItem
              key={item._id}
              onView={async (notification: Notification) => {
                if (notification.type == "post_approved") {
                  router.push(`/blog/${notification.post._id}`);
                } else {
                }
              }}
              notification={item}
            />
          ))}
        </InfiniteScroll>
      ) : (
        <div className="flex flex-col items-center justify-center h-[300px] gap-2">
          <Image
            className="object-cover"
            src="/icons/NoNoti.svg"
            alt={"no_noti"}
            width={50}
            height={50}
          />
          <span className="font-bold text-lg text-gray">
            Chưa có thông báo mới
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex items-center gap-5">
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 font-medium">
          Bạn muốn chia sẻ?
        </span>
        <div className="flex items-center gap-1 cursor-pointer hover:underline">
          <Link href={"/viet-bai"} className="font-bold text-sm ">
            Đăng bài ngay
          </Link>
          <GrLinkNext className="text-sm" />
        </div>
      </div>
      {/* Thông báo */}

      <Dropdown
        overlay={notificationMenu}
        trigger={["click"]}
        placement="bottomRight"
      >
        <div className="rounded-full p-2 hover:bg-purple-100 cursor-pointer group">
          <Badge count={notifications.length} color="#a855f7">
            <IoIosNotificationsOutline className="text-2xl group-hover:text-purple-500" />
          </Badge>
        </div>
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
