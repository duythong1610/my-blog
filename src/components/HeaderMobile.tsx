"use client";

import logo from "@/assets/images/logo.png";
import useMenuAnimation from "@/hooks/useMenuAnimation";
import { useNotification } from "@/hooks/useNotification";
import Notification, { NotificationType } from "@/types/notification";
import { Badge, Dropdown } from "antd";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import { MenuToggle } from "./MenuToggle";
import NotificationItem from "./Notification/NotificationItem";
import ThemeSwitcher from "./ThemeSwitcher";
import { GrLinkNext } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { logout } from "@/lib/features/users/userSlice";
import { notificationApi } from "@/api/notifaction.api";

const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const router = useRouter();
  const user = useAppSelector((state) => state.user.info);
  const dispatch = useAppDispatch();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const scope = useMenuAnimation(isOpen);

  const { notifications, fetchNotification } = useNotification({
    initQuery: {
      page: 1,
      limit: 50,
    },
  });

  const handleLogout = () => {
    setIsOpen(false);
    dispatch(logout());
    router.push("/login");
  };

  const handleReadNotification = async (notificationId: string) => {
    try {
      await notificationApi.isRead(notificationId);
      fetchNotification();
    } catch (error) {}
  };

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
                setIsNotificationOpen(false);
                if (
                  notification.type == NotificationType.postApprove ||
                  notification.type == NotificationType.comment
                ) {
                  router.push(`/blog/${notification.post.slug}`);
                }

                if (notification.type == NotificationType.follow) {
                  router.push(`/user/${notification.senders?.[0].username}`);
                }

                if (!notification.isRead) {
                  await handleReadNotification(notification._id);
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
    <div>
      {" "}
      <nav className="h-20 hidden md:block overflow-hidden sticky top-0 left-0 right-0 ">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: "1" }}
          className="md:flex justify-between h-full items-center hidden"
        >
          <div className="text-white font-medium text-lg">
            <Link href="/">
              <Image
                src={logo}
                alt=""
                width={100}
                height={100}
                className="w-[80px] h-[80px] object-contain rounded-full"
              />
            </Link>
          </div>

          <ul className="md:flex gap-10 text-white font-medium text-lg hidden">
            <li>
              <Link href="#main">MAIN</Link>
            </li>
            <li>
              <Link href="#about">ABOUT</Link>
            </li>
            <li>
              <Link href="#work">WORK</Link>
            </li>
            <li>
              <Link href="#techskills">TECH SKILLS</Link>
            </li>

            <li>
              <Link href="#project">PROJECTS</Link>
            </li>
            <li>
              <Link
                href="/blog/hello-world "
                className="py-2 px-5 bg-purple-600 rounded-3xl"
              >
                SAY HELLO
              </Link>
            </li>
          </ul>
        </motion.div>
      </nav>
      <nav className="p-4 h-20 block md:hidden bg-white dark:bg-[#0d0d0d40] backdrop-blur-[5px] shadow-md fixed top-0 left-0 right-0 z-10">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: "1" }}
          className="flex justify-between h-full items-center"
        >
          <div className="font-medium text-lg">
            <Link href="/" className="text-base font-black uppercase">
              <div className="flex items-center gap-2">
                <Image
                  src={logo}
                  alt={""}
                  width={40}
                  className="object-contain rounded-full"
                />{" "}
                WriteFlow
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-1 md:gap-2 pl-[60px]">
            {/* Thông báo */}
            {user && (
              <Dropdown
                overlay={notificationMenu}
                open={isNotificationOpen}
                onOpenChange={(visible) => setIsNotificationOpen(visible)}
                trigger={["click"]}
                placement="bottomCenter"
              >
                <div className="rounded-full p-1 md:p-2 w-8 h-8 md:w-10 md:h-10 hover:bg-[#222] cursor-pointer group">
                  <Badge
                    count={notifications.length}
                    color="#a855f7"
                    className="!border-none"
                  >
                    <IoIosNotificationsOutline className="text-2xl dark:text-white group-hover:text-purple-500" />
                  </Badge>
                </div>
              </Dropdown>
            )}

            <ThemeSwitcher />
          </div>
          <div ref={scope}>
            <nav className="menu border-purple-400 border-b-[3px] bg-white dark:bg-[#222] md:hidden px-5">
              {user && (
                <>
                  <div className="flex items-center gap-3">
                    <Image
                      className="object-cover rounded-full w-[64px] h-[64px]"
                      src={user.avatar || ""}
                      alt={"author_avatar"}
                      width={200}
                      height={200}
                    />
                    <div className="flex flex-col gap-1">
                      <Link
                        href={`/account/profile`}
                        onClick={() => setIsOpen(false)}
                        className="text-[#33404A] dark:text-white font-bold"
                      >
                        {user?.fullName}
                      </Link>
                      <span>@{user.username}</span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Bạn muốn chia sẻ?
                    </span>
                    <Link
                      href={"/viet-bai"}
                      className="font-bold text-sm w-fit"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-1 cursor-pointer hover:underline">
                        Đăng bài ngay
                        <GrLinkNext className="text-sm" />
                      </div>
                    </Link>
                  </div>
                </>
              )}

              <ul className="flex gap-4 flex-col mt-5 text-xl">
                <li>
                  <Link
                    href="/"
                    className={`font-medium hover:text-purple-500 ${
                      pathname === "/" ? " text-purple-500 !font-bold" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
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
                    onClick={() => setIsOpen(false)}
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
                    onClick={() => setIsOpen(false)}
                  >
                    Hỏi đáp
                  </Link>
                </li>
                <li>
                  <Link
                    href="/course"
                    className={`font-medium hover:text-purple-500 ${
                      pathname === "/course"
                        ? " text-purple-500 !font-bold"
                        : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Khóa học
                  </Link>
                </li>
              </ul>
              {!user ? (
                <div className="flex items-center gap-3 mt-10">
                  <div className="w-1/2 m-auto">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <div className="bg-purple-500 border-none text-white hover:bg-purple-400 rounded-[40px] py-2 px-3 m-auto">
                        <div className="text-center">
                          <span className="font-bold">Đăng nhập</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 mt-10">
                  <div className="w-1/2 m-auto">
                    <div onClick={() => handleLogout()}>
                      <div className="bg-purple-500 border-none text-white hover:bg-purple-400 rounded-[40px] py-2 px-3 m-auto">
                        <div className="text-center">
                          <span className="font-bold">Đăng xuất</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </nav>
            <MenuToggle toggle={() => setIsOpen(!isOpen)} />
          </div>
        </motion.div>
      </nav>
    </div>
  );
};

export default HeaderMobile;
