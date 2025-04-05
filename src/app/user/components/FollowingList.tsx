"use client";

import { useFollowing } from "@/hooks/useFollowing";
import FollowingItem from "./FollowingItem";

export default function FollowingList({ userId }: { userId: string }) {
  const { loadingFollowing, following } = useFollowing({
    initQuery: {
      page: 1,
      limit: 10,
      userId: userId,
    },
  });

  console.log(following);

  if (loadingFollowing) return <p>Đang tải...</p>;

  return (
    <div className="">
      {following?.length === 0 ? (
        <p>Chưa theo dõi người dùng nào.</p>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {following?.map((fol) => (
            <FollowingItem following={fol} />
          ))}
        </div>
      )}
    </div>
  );
}
  