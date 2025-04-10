"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
} from "react-share";
import { FaFacebook, FaTwitter, FaReddit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { Tooltip } from "antd";
import { User } from "@/types/user";
import Image from "next/image";
import Link from "next/link";

const FloatButtonGroup = ({ author }: { author: User }) => {
  const currentUrl = window.location.href;

  return (
    <div className="w-[50px]">
      <div className="hidden md:block md:sticky md:top-[100px] md:h-max md:py-[200px] md:max-w-[400px] ">
        <div className="flex flex-col gap-3 items-center">
          {/* Nút chia sẻ Facebook */}
          <Tooltip title="Chia sẻ bài viết đến facebook">
            <FacebookShareButton url={currentUrl}>
              <div className="rounded-full w-10 h-10 flex items-center justify-center border border-[#ccc] hover:bg-gray-100 dark:hover:bg-[#222]">
                <FaFacebook className="text-2xl" />
              </div>
            </FacebookShareButton>
          </Tooltip>

          {/* Nút chia sẻ Twitter */}
          <Tooltip title="Chia sẻ bài viết đến twitter">
            <TwitterShareButton url={currentUrl}>
              <div className="rounded-full w-10 h-10 flex items-center justify-center border border-[#ccc] hover:bg-gray-100 dark:hover:bg-[#222]">
                <BsTwitterX className="text-lg" />
              </div>
            </TwitterShareButton>
          </Tooltip>

          {/* Nút chia sẻ Reddit */}
          <Tooltip title="Chia sẻ bài viết đến reddit">
            <RedditShareButton url={currentUrl}>
              <div className="rounded-full w-10 h-10 flex items-center justify-center border border-[#ccc] hover:bg-gray-100 dark:hover:bg-[#222]">
                <FaReddit className="text-2xl" />
              </div>
            </RedditShareButton>
          </Tooltip>
        </div>
      </div>
      <div className="fixed bottom-[10px] left-4 right-4 z-50 bg-black text-white dark:bg-[#111] rounded-[40px] py-2 px-5 md:hidden">
        <div className="flex justify-between items-center">
          <Link
            href={`/user/${author.username}`}
            className="text-[#33404A] dark:text-white font-bold"
          >
            <Image
              width={100}
              height={100}
              className="w-10 h-10 rounded-full object-cover"
              src={author?.avatar || ""}
              alt={author?.bio || "author_avatar"}
            />
          </Link>
          {/* Nút chia sẻ Facebook */}
          <Tooltip title="Chia sẻ bài viết đến facebook">
            <FacebookShareButton url={currentUrl}>
              <div className="rounded-full w-10 h-10 flex items-center justify-center">
                <FaFacebook className="text-3xl" />
              </div>
            </FacebookShareButton>
          </Tooltip>

          {/* Nút chia sẻ Twitter */}
          <Tooltip title="Chia sẻ bài viết đến twitter">
            <TwitterShareButton url={currentUrl}>
              <div className="rounded-full w-10 h-10 flex items-center justify-center">
                <BsTwitterX className="text-2xl" />
              </div>
            </TwitterShareButton>
          </Tooltip>

          {/* Nút chia sẻ Reddit */}
          <Tooltip title="Chia sẻ bài viết đến reddit">
            <RedditShareButton url={currentUrl}>
              <div className="rounded-full w-10 h-10 flex items-center justify-center">
                <FaReddit className="text-3xl" />
              </div>
            </RedditShareButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default FloatButtonGroup;
