"use client";

import logo from "@/assets/images/logo.png";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import UserMenu from "./UserMenu";
import { isMobile } from "react-device-detect";
import HeaderMobile from "./HeaderMobile";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { authApi } from "@/api/auth.api";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { getProfile, login } from "@/lib/features/users/userSlice";
import { message } from "antd";
import { getToken } from "@/utils/auth";

export default function Header() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const user = useAppSelector((state) => state.user.info);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOAuthHandled, setIsOAuthHandled] = useState(false);

  // const handleOAuthLogin = async () => {
  //   if (status === "authenticated" && data?.user?.email && !isOAuthHandled) {
  //     try {
  //       const response = await authApi.oauth({
  //         email: data.user.email,
  //         name: data.user.name,
  //         image: data.user.image,
  //         //@ts-ignore
  //         provider: data.user?.provider,
  //         //@ts-ignore
  //         providerId: data.user?.providerId,
  //       });

  //       if (response.data) {
  //         dispatch(login(response.data.accessToken));
  //         await dispatch(getProfile());
  //         setIsOAuthHandled(true);
  //         message.success("Đăng nhập thành công!");
  //       }
  //     } catch (err) {
  //       console.error("OAuth login failed", err);
  //       message.error("Đăng nhập bằng Google thất bại");
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (!user && status === "authenticated" && data && !isOAuthHandled) {
  //     debugger;
  //     handleOAuthLogin();
  //   }

  //   if (user && !isOAuthHandled) {
  //     debugger;
  //     dispatch(getProfile());
  //   }
  // }, [status, data, isOAuthHandled, user, dispatch]);

  return (
    <>
      {isMobile ? (
        <HeaderMobile />
      ) : (
        <header className="w-full p-4  m-auto fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0d0d0d40] backdrop-blur-[5px] shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
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

            {/* Menu */}
            <nav>
              <ul className="flex space-x-6">
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

            <div className="flex items-center gap-2">
              <UserMenu />
            </div>
          </div>
        </header>
      )}
    </>
  );
}
