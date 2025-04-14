import calendarIcon from "@/assets/images/calendar_icon.png";
import handWritingIcon from "@/assets/images/hand_writing.png";
import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="text-center mt-8 mb-[96px]">
      <div className="flex items-center justify-center">
        {/* <div>
          <Image
            src={calendarIcon}
            alt={""}
            width={150}
            className="object-contain"
          />
        </div> */}
        <div>
          <h1>
            <span className="font-black text-purple-500 uppercase text-[42px] md:text-[64px]">
              WriteFlow{" "}
            </span>{" "}
            <p className="text-[28px] md:text-[64px]">
              Hãy chia sẻ kiến thức{" "}
              <div className="inline-block relative">
                <div className="bg-purple-200 dark:bg-purple-500 h-3 md:h-7 absolute bottom-2 md:bottom-[20px] rounded-[20px] left-0 right-0 -z-10"></div>
                <span className="font-black">của bạn</span>
              </div>
            </p>
          </h1>
          <p className="text-[#33404A] dark:text-gray-400 font-medium mt-3">
            Chia sẻ kiến thức, kết nối cộng đồng – Nơi mỗi bài viết là một hành
            trình học hỏi!
          </p>
        </div>
        {/* <div>
          <Image
            src={handWritingIcon}
            alt={""}
            width={150}
            className="object-contain"
          />
        </div> */}
      </div>
    </section>
  );
}
