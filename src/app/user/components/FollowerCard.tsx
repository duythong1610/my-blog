import { User } from "@/types/user";
import Image from "next/image";
import Link from "next/link";

interface PropTypes {
  follower: User;
}

export default function FollowerCard({ follower }: PropTypes) {
  return (
    <div className="bg-slate-50 dark:bg-[#222] rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/user/${follower.username}`} key={follower._id}>
            <Image
              src={follower.avatar || ""}
              alt={""}
              width={100}
              height={100}
              className="w-[100px] h-[100px] rounded-xl object-cover"
            />
          </Link>
          <div>
            <Link
              href={`/user/${follower.username}`}
              key={follower._id}
              className="hover:text-purple-500"
            >
              <h1 className="font-bold text-lg">{follower.fullName}</h1>
            </Link>
            <span className="text-gray-400 font-medium">
              @{follower.username}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
