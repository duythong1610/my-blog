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

  // ✅ Kiểm tra trạng thái theo dõi
  const handleCheckFollow = async (userId: string) => {
    const response = await followApi.checkFollow({ userId });
    return response.data;
  };

  const { data, isLoading } = useQuery<DataProps>({
    queryKey: ["isFollowing", userId],
    queryFn: () => handleCheckFollow(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
    gcTime: Infinity,
  });

  // ✅ Mutation để theo dõi
  const followMutation = useMutation({
    mutationFn: () => followApi.follow({ followingId: userId }),
    onSuccess: () => {
      const followersQuery = { page: 1, limit: 10, userId };
      queryClient.invalidateQueries({ queryKey: ["isFollowing", userId] });
      queryClient.invalidateQueries({
        queryKey: ["followers", followersQuery],
      });
      message.success("Đã theo dõi người dùng!");
    },
    onError: () => {
      message.error("Theo dõi thất bại!");
    },
  });

  // ✅ Mutation để bỏ theo dõi
  const unfollowMutation = useMutation({
    mutationFn: () => followApi.unFollow({ followingId: userId }),
    onSuccess: () => {
      const followersQuery = { page: 1, limit: 10, userId };
      queryClient.invalidateQueries({ queryKey: ["isFollowing", userId] });
      queryClient.invalidateQueries({
        queryKey: ["followers", followersQuery],
      });
      message.success("Đã bỏ theo dõi người dùng!");
    },
    onError: () => {
      message.error("Bỏ theo dõi thất bại!");
    },
  });

  const handleFollow = () => {
    followMutation.mutate();
  };

  const handleUnfollow = () => {
    unfollowMutation.mutate();
  };

  if (userId === user?._id || isLoading) return null;

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
          loading={isLoading || followMutation.isPending}
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
