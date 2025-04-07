import { notificationSettingApi } from "@/api/notification-setting.api";
import { postApi } from "@/api/post.api";
import { updateNotificationSettings } from "@/services/notification-settings";
import { NotificationSettings } from "@/types/notificationSettings";
import { Post } from "@/types/post";
import { QueryParam } from "@/types/query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

export type NotificationSettingsQuery = QueryParam;

interface NotificationSettingsProps {
  initQuery: NotificationSettingsQuery;
}

interface DataProps {
  notificationSettings: NotificationSettings;
  total: number;
}

export const useNotificationSettings = ({
  initQuery,
}: NotificationSettingsProps) => {
  const [query, setQuery] = useState<NotificationSettingsQuery>(initQuery);

  const fetchNotificationSettings = async (
    query: NotificationSettingsQuery
  ) => {
    const response = await notificationSettingApi.findAll(query);
    return response.data;
  };

  const { data, isLoading, isFetching, isError, error, status, refetch } =
    useQuery<DataProps>({
      queryKey: ["notificationSettings", query],
      queryFn: () => fetchNotificationSettings(query),
      enabled: !!query,
      refetchOnWindowFocus: false,
      gcTime: Infinity,
    });

  const debounceSearchNotificationSettings = useCallback(
    debounce((searchValue: string) => {
      setQuery((prevQuery) => ({ ...prevQuery, search: searchValue }));
    }, 300),
    []
  );

  const handleUpdateNotificationSettings = (notificationSettingsId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: NotificationSettings) =>
        updateNotificationSettings(notificationSettingsId, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notificationSettings"] });
      },
    });
  };
  console.log({ isLoading, isFetching });

  console.log({ status, isError, error });

  return {
    notificationSettings: data?.notificationSettings,
    totalNotificationSettings: data?.total || 0,
    loadingNotificationSettings: isLoading,
    fetchNotificationSettings: refetch,
    queryNotificationSettings: query,
    setQueryNotificationSettings: setQuery,
    debounceSearchNotificationSettings,
    isError,
    handleUpdateNotificationSettings,
  };
};
