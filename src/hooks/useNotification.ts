import { notificationApi } from "@/api/notifaction.api";
import { postApi } from "@/api/post.api";
import Notification from "@/types/notification";
import { Post } from "@/types/post";
import { QueryParam } from "@/types/query";
import { Tag } from "@/types/tag";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useState, useCallback } from "react";

export interface NotificationQuery extends QueryParam {}

interface NotificationProps {
  initQuery: NotificationQuery;
}

interface DataProps {
  notifications: Notification[];
  total: number;
}

export const useNotification = ({ initQuery }: NotificationProps) => {
  const [query, setQuery] = useState<NotificationQuery>(initQuery);

  const fetchNotification = async (query: NotificationQuery) => {
    const response = await notificationApi.findAll(query);
    return response.data;
  };

  const { data, isLoading, isFetching, isError, error, status, refetch } =
    useQuery<DataProps>({
      queryKey: ["notifications", query],
      queryFn: () => fetchNotification(query),
      enabled: !!query,
      refetchOnWindowFocus: false,
      gcTime: Infinity,
    });

  const debounceSearchNotification = useCallback(
    debounce((searchValue: string) => {
      setQuery((prevQuery) => ({ ...prevQuery, search: searchValue }));
    }, 300),
    []
  );

  return {
    notifications: data?.notifications || [],
    totalNotification: data?.total || 0,
    loadingNotification: isLoading,
    fetchNotification: refetch,
    queryNotification: query,
    setQueryNotification: setQuery,
    debounceSearchNotification,
    isError,
  };
};
