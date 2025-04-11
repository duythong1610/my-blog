import Image from "next/image";
import React from "react";
import developingImg from "@/assets/images/developing.png";

const Developing = () => {
  return (
    <div className="text-center">
      <div className="rounded-xl overflow-hidden">
        <Image
          src={developingImg}
          alt={"developing-img"}
          width={1920}
          height={1080}
          className="h-[200px] md:h-[600px] w-full object-contain"
        />
      </div>
      <h1 className="text-purple-500 font-bold text-xl mt-5">
        Đang phát triển
      </h1>
    </div>
  );
};

export default Developing;
