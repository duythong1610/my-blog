"use client";

import { useNotification } from "@/hooks/useNotification";
import { useAppSelector } from "@/lib/hook";
import Notification from "@/types/notification";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import { useClickAway } from "react-use";
import ConfirmLogoutModal, {
  ConfirmLogoutModalRef,
} from "./Modal/ConfirmLogoutModal";
import NotificationItem from "./Notification/NotificationItem";
import ThemeSwitcher from "./ThemeSwitcher";

export default function UserMenu() {
  const router = useRouter();
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const dropdownRef = useRef(null);
  const user = useAppSelector((state) => state.user.info);

  const confirmLogoutModalRef = useRef<ConfirmLogoutModalRef>();

  useClickAway(dropdownRef, () => {
    setIsOpenNotification(false);
  });

  console.log("object");

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

  console.log("render");

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/auth">
          <div className="bg-purple-500 border-none text-white hover:bg-purple-400 rounded-[40px] py-2 px-3 cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="font-bold">Đăng nhập</span>
            </div>
          </div>
        </Link>
        <ThemeSwitcher />
      </div>
    );
  }

  // Menu tài khoản
  const menu = (
    <Menu
      items={[
        {
          key: "account",
          label: "Tài khoản của tôi",
          icon: <UserOutlined className="!text-base mb-[2px]" />,
          onClick: () => router.push("/account"),
        },
        {
          key: "logout",
          label: "Đăng xuất",
          icon: <LogoutOutlined className="!text-base mb-[2px]" />,
          onClick: () => confirmLogoutModalRef.current?.handleOpen(),
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
                  router.push(`/blog/${notification.post.slug}`);
                } else {
                }
                setIsOpenNotification(false);
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
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Bạn muốn chia sẻ?
        </span>
        <Link href={"/viet-bai"} className="font-bold text-sm">
          <div className="flex items-center gap-1 cursor-pointer hover:underline">
            Đăng bài ngay
            <GrLinkNext className="text-sm" />
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {/* Thông báo */}
        <Dropdown
          open={isOpenNotification}
          overlay={notificationMenu}
          trigger={["click"]}
          placement="bottomRight"
        >
          <div
            ref={dropdownRef}
            className="rounded-full p-2 w-10 h-10 hover:bg-purple-100 cursor-pointer group"
            onClick={() => setIsOpenNotification(!isOpenNotification)}
          >
            <Badge count={notifications.length} color="#a855f7">
              <IoIosNotificationsOutline className="text-2xl dark:text-white group-hover:text-purple-500" />
            </Badge>
          </div>
        </Dropdown>
        <ThemeSwitcher />

        {/* Avatar và Menu */}
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <Avatar
            src={user.avatar}
            icon={!user.avatar && <UserOutlined />}
            className="cursor-pointer"
          />
        </Dropdown>
      </div>
      <ConfirmLogoutModal ref={confirmLogoutModalRef} />
    </div>
  );
}
