import { User } from "@/types/user";
import Image from "next/image";
import Link from "next/link";

interface PropTypes {
  following: User;
}

export default function FollowingItem({ following }: PropTypes) {
  return (
    <div className="bg-slate-50 dark:bg-transparent rounded-xl">
      <div className="flex items-center">
        <div className="flex flex-col gap-2 w-full">
          <Link href={`/user/${following.username}`} key={following._id}>
            <Image
              src={following.avatar || ""}
              alt={""}
              width={150}
              height={150}
              className="w-[115px] h-[115px] rounded-xl object-cover block m-auto"
            />
          </Link>
          <div>
            <Link
              href={`/user/${following.username}`}
              key={following._id}
              className="hover:text-purple-500"
            >
              <h1 className="font-bold text-base">{following.fullName}</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
