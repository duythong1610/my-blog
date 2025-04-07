import { notificationSettingApi } from "@/api/notification-setting.api";
import { NotificationSettings } from "@/types/notificationSettings";
import { QueryParam } from "@/types/query";
import { useQuery } from "@tanstack/react-query";
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

  return {
    notificationSettings: data?.notificationSettings,
    totalNotificationSettings: data?.total || 0,
    loadingNotificationSettings: isLoading,
    fetchNotificationSettings: refetch,
    queryNotificationSettings: query,
    setQueryNotificationSettings: setQuery,
    debounceSearchNotificationSettings,
    isError,
  };
};
