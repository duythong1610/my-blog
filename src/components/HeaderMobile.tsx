"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MenuToggle } from "./MenuToggle";
import { useState } from "react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import useMenuAnimation from "@/hooks/useMenuAnimation";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  const scope = useMenuAnimation(isOpen);

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
      <nav className="p-4 h-20 block md:hidden bg-white overflow-hidden fixed top-0 left-0 right-0 z-10">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: "1" }}
          className="flex justify-between h-full items-center"
        >
          <div className=" font-medium text-lg">
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
