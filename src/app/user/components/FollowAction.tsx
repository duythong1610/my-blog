"use client";

import { followApi } from "@/api/follow.api";
import { useAppSelector } from "@/lib/hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message } from "antd";
import React from "react";
import { SlUserFollowing, SlUserUnfollow } from "react-icons/sl";

interface DataProps {
  isFollowing: boolean;
}

const FollowAction = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user.info);

  // ✅ Fetch trạng thái theo dõi
  const { data, isLoading } = useQuery<DataProps>({
    queryKey: ["isFollowing", userId],
    queryFn: async () => {
      const response = await followApi.checkFollow({ userId });
      return response.data;
    },
    enabled: !!userId && !!user,
    refetchOnWindowFocus: false,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  // ✅ Follow mutation (optimistic update)
  const followMutation = useMutation({
    mutationFn: () => followApi.follow({ followingId: userId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["isFollowing", userId] });

      const previousData = queryClient.getQueryData<DataProps>([
        "isFollowing",
        userId,
      ]);

      // Cập nhật optimistic
      queryClient.setQueryData(["isFollowing", userId], {
        isFollowing: true,
      });

      return { previousData };
    },
    onError: (_, __, context) => {
      // Rollback nếu lỗi
      if (context?.previousData) {
        queryClient.setQueryData(["isFollowing", userId], context.previousData);
      }
      message.error("Theo dõi thất bại!");
    },
    onSettled: () => {
      const followersQuery = { page: 1, limit: 10, userId };
      queryClient.invalidateQueries({
        queryKey: ["followers", followersQuery],
      });
    },
    onSuccess: () => {
      message.success("Đã theo dõi người dùng!");
    },
  });

  // ✅ Unfollow mutation (optimistic update)
  const unfollowMutation = useMutation({
    mutationFn: () => followApi.unFollow({ followingId: userId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["isFollowing", userId] });

      const previousData = queryClient.getQueryData<DataProps>([
        "isFollowing",
        userId,
      ]);

      // Cập nhật optimistic
      queryClient.setQueryData(["isFollowing", userId], {
        isFollowing: false,
      });

      return { previousData };
    },
    onError: (_, __, context) => {
      // Rollback nếu lỗi
      if (context?.previousData) {
        queryClient.setQueryData(["isFollowing", userId], context.previousData);
      }
      message.error("Bỏ theo dõi thất bại!");
    },
    onSettled: () => {
      const followersQuery = { page: 1, limit: 10, userId };
      queryClient.invalidateQueries({
        queryKey: ["followers", followersQuery],
      });
    },
    onSuccess: () => {
      message.success("Đã bỏ theo dõi người dùng!");
    },
  });

  const handleFollow = () => followMutation.mutate();
  const handleUnfollow = () => unfollowMutation.mutate();

  if (!user || userId === user?._id || isLoading) return null;

  return (
    <div>
      {data?.isFollowing ? (
        <Button
          icon={<SlUserUnfollow />}
          className="rounded-[20px]"
          onClick={handleUnfollow}
          loading={unfollowMutation.isPending}
        >
          Bỏ theo dõi
        </Button>
      ) : (
        <Button
          loading={followMutation.isPending}
          type="primary"
          icon={<SlUserFollowing />}
          className="rounded-[20px]"
          onClick={handleFollow}
        >
          Theo dõi
        </Button>
      )}
    </div>
  );
};

export default FollowAction;
