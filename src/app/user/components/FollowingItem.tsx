import { User } from "@/types/user";
import Image from "next/image";
import Link from "next/link";

interface PropTypes {
  following: User;
}

export default function FollowingItem({ following }: PropTypes) {
  return (
    <div className="bg-slate-50 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Image
            src={following.avatar || ""}
            alt={""}
            width={150}
            height={150}
            className="w-[115px] h-[115px] rounded-xl object-cover"
          />
          <div>
            <Link href={`/user/${following.username}`} key={following._id}>
              <h1 className="font-bold text-base">{following.fullName}</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
