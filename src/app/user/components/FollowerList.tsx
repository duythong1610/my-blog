"use client";

import FollowerCard from "@/app/user/components/FollowerCard";
import { useFollowers } from "@/hooks/useFollowers";

export default function FollowerList({ userId }: { userId: string }) {
  const { loadingFollowers, followers } = useFollowers({
    initQuery: {
      page: 1,
      limit: 10,
      userId: userId,
    },
  });

  console.log(followers);

  if (loadingFollowers) return <p>Đang tải...</p>;

  return (
    <div className="m-auto">
      {followers?.length === 0 ? (
        <p>Chưa có người theo dõi.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-[48px]">
          {followers?.map((follower) => (
            <FollowerCard key={follower._id} follower={follower} />
          ))}
        </div>
      )}
    </div>
  );
}
