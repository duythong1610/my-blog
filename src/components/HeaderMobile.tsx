"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MenuToggle } from "./MenuToggle";
import { useRef, useState } from "react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import useMenuAnimation from "@/hooks/useMenuAnimation";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Badge, Dropdown } from "antd";
import { useNotification } from "@/hooks/useNotification";
import InfiniteScroll from "react-infinite-scroll-component";
import NotificationItem from "./Notification/NotificationItem";
import { IoIosNotificationsOutline } from "react-icons/io";
import ThemeSwitcher from "./ThemeSwitcher";
import Notification from "@/types/notification";

const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  const scope = useMenuAnimation(isOpen);

  const { notifications, fetchNotification } = useNotification({
    initQuery: {
      page: 1,
      limit: 50,
    },
  });

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
              onView={(notification: Notification) => {
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
                className="w-[80px] h-[80px] object-contain"
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
      <nav className="p-4 h-20 block md:hidden bg-white dark:bg-[#0e100f] shadow-md overflow-hidden fixed top-0 left-0 right-0 z-10">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: "1" }}
          className="flex justify-between h-full items-center"
        >
          <div className="font-medium text-lg">
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
          </div>
          <div className="flex items-center gap-1 md:gap-2 pl-[50px]">
            {/* Thông báo */}
            <Dropdown
              open={isOpenNotification}
              overlay={notificationMenu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div
                ref={dropdownRef}
                className="rounded-full p-1 md:p-2 w-8 h-8 md:w-10 md:h-10 hover:bg-purple-100 cursor-pointer group"
                onClick={() => setIsOpenNotification(!isOpenNotification)}
              >
                <Badge count={notifications.length} color="#a855f7">
                  <IoIosNotificationsOutline className="text-2xl dark:text-white group-hover:text-purple-500" />
                </Badge>
              </div>
            </Dropdown>
            <ThemeSwitcher />
          </div>
          <div ref={scope}>
            <nav className="menu border-purple-400 border-b-[3px] bg-white dark:bg-[#222] md:hidden">
              <ul className="flex gap-5 flex-col items-center text-3xl">
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
                      pathname === "/course"
                        ? " text-purple-500 !font-bold"
                        : ""
                    }`}
                  >
                    Khóa học
                  </Link>
                </li>
              </ul>
            </nav>
            <MenuToggle toggle={() => setIsOpen(!isOpen)} />
          </div>
        </motion.div>
      </nav>
    </div>
  );
};

export default HeaderMobile;
