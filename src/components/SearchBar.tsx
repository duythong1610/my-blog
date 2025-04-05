import magnifyingGlassIcon from "@/assets/icons/MagnifyingGlass.svg";
import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="mb-2">
      <div className="px-2 py-3 bg-white dark:bg-[#222] rounded-lg">
        <div className="flex items-center justify-between gap-10">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none border-none dark:bg-transparent"
          />
          <div className="bg-purple-500 p-3 rounded-[12px] w-fit cursor-pointer">
            <Image
              src={magnifyingGlassIcon}
              alt={"icon"}
              width={24}
              height={24}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
