"use client";

import { useSummary } from "@/hooks/useSummary";

export default function UserSummary({ userId }: { userId: string }) {
  const { summary } = useSummary({
    initQuery: {
      page: 1,
      limit: 10,
      userId,
    },
  });

  if (!summary) return <p>Đang tải...</p>;

  return (
    <div className="m-auto">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="">Tổng số bài viết</label>
          <span className="font-bold">{summary.totalPosts}</span>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="">Tổng số lượt xem bài viết</label>
          <span className="font-bold">{summary.totalViews}</span>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="">Tổng số lượt yêu thích bài viết</label>
          <span className="font-bold">{summary.totalLikes}</span>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="">Tổng số lượt bình luận</label>
          <span className="font-bold">{summary.totalComments}</span>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="">Tổng số lượt trả lời</label>
          <span className="font-bold">{summary.totalReplies}</span>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="">Tổng số người theo dõi</label>
          <span className="font-bold">{summary.totalFollowers}</span>
        </div>
      </div>
    </div>
  );
}
