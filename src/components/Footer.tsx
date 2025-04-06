// import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
"use client";

import logo from "@/assets/images/logo.png";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="py-5 px-5 md:px-10 mt-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex md:flex-row flex-col gap-5 md:gap-20">
        {/* Logo & Description */}
        <div className="md:w-[600px]">
          <div className="flex items-center font-black uppercase">
            <Image
              src={logo}
              alt={""}
              width={50}
              className="object-contain"
              style={{ filter: theme == "dark" ? "invert(1)" : "" }}
            />{" "}
            WriteFlow
          </div>
          <p className="mt-5 text-base text-gray-500">
            Chúng tôi tin rằng kiến thức nên được sẻ chia. Tại WriteFlow, bất kỳ
            ai cũng có thể kể câu chuyện của mình, chia sẻ kinh nghiệm lập trình
            và truyền cảm hứng cho cộng đồng. Dù bạn là người mới học code hay
            lập trình viên nhiều năm kinh nghiệm, mỗi bài viết đều là một mảnh
            ghép quý giá giúp cộng đồng phát triển vững mạnh hơn từng ngày.
          </p>
        </div>

        <div className="md:flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Navigation Links */}
            <div>
              <h3 className="text-base font-semibold mb-4 md:mb-10">
                Liên kết
              </h3>
              <ul className="flex flex-col gap-2 text-lg font-semibold">
                <li>
                  <Link
                    target="_blank"
                    href="https://whatdaporice.website"
                    className=""
                  >
                    Về tôi
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="/chinh-sach-bao-mat" className="">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link href="/dieu-khoan-su-dung" className="">
                    Điều khoản sử dụng
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-base font-semibold mb-4 md:mb-10">Kết nối</h3>
              <div className="flex flex-col gap-2 text-lg font-semibold">
                <Link
                  target="_blank"
                  href="https://www.facebook.com/16LuckyNumber"
                  className="flex items-center gap-2"
                >
                  <FaFacebook size={20} />
                  Facebook
                </Link>

                <Link
                  target="_blank"
                  href="https://www.instagram.com/auduythong"
                  className="flex items-center gap-2"
                >
                  <FaInstagram size={20} />
                  Instagram
                </Link>
                <Link
                  target="_blank"
                  href="https://github.com/duythong1610"
                  className="flex items-center gap-2"
                >
                  <FaGithub size={20} />
                  Github
                </Link>
                <Link
                  href="mailto:auduythong1610@gmail.com"
                  className="flex items-center gap-2"
                >
                  <CiMail size={20} />
                  Email
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm pt-6">
        © {new Date().getFullYear()} WriteFlow. All rights reserved.
      </div>
    </footer>
  );
}
