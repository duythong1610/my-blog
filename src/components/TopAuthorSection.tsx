"use client";
import { useRef } from "react";
import { useTopAuthor } from "@/hooks/useTopAuthor";
import AuthorCard from "./AuthorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const TopAuthorSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const { users } = useTopAuthor({
    initQuery: {
      page: 1,
      limit: 10,
    },
  });

  return (
    <div className="py-10">
      <h1 className="font-extrabold text-xl md:text-3xl text-[#050505] dark:text-white leading-[50px] md:mb-5">
        Tác giả hàng đầu
      </h1>
      <div className="relative w-full">
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

        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={24}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="!py-5"
        >
          {users?.map((user) => (
            <SwiperSlide key={user._id}>
              <AuthorCard author={user} key={user._id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopAuthorSection;
