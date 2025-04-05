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
    <footer className="py-10 px-6 md:px-16 mt-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex">
        {/* Logo & Description */}
        <div className="w-[600px]">
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
          <p className="mt-2 text-sm text-gray-400">
            Chia sẻ kiến thức, kỹ năng lập trình, và cuộc sống của một dev.
          </p>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Navigation Links */}
            <div>
              <h3 className="text-base font-semibold mb-10">Liên kết</h3>
              <ul className="flex flex-col gap-3 text-lg font-semibold">
                <li>
                  <Link href="/about" className="">
                    Về tôi
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="">
                    Chính sách bảo mật
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-base font-semibold mb-10">Kết nối</h3>
              <div className="flex flex-col gap-3 text-lg font-semibold">
                <Link href="#" className="flex items-center gap-2">
                  <FaFacebook size={20} />
                  Facebook
                </Link>

                <Link href="#" className="flex items-center gap-2">
                  <FaInstagram size={20} />
                  Instagram
                </Link>
                <Link href="#" className="flex items-center gap-2">
                  <FaGithub size={20} />
                  Github
                </Link>
                <Link
                  href="mailto:hello@myblog.com"
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
