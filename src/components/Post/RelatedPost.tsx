"use client";

import { Post } from "@/types/post";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PostCard from "./PostCard";
import { isMobile } from "react-device-detect";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";

const RelatedPosts = ({ posts }: { posts: Post[] }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full mx-auto py-[60px] relative">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        Bài viết liên quan
      </h2>

      {/* Custom Navigation Buttons */}
      <div className="absolute top-[50%] left-0 z-10 transform -translate-y-1/2">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white shadow-md rounded-full p-2 ml-2 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="absolute top-[50%] right-0 z-10 transform -translate-y-1/2">
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white shadow-md rounded-full p-2 mr-2 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="swiper-container">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={isMobile ? 1 : 4}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="!pb-12 !h-full"
        >
          {posts.map((post) => (
            <SwiperSlide key={post._id} className="!h-auto">
              <div className="h-full">
                <PostCard loading={false} post={post} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedPosts;
