import { notificationSettingApi } from "@/api/notification-setting.api";
import { userApi } from "@/api/user.api";
import { NotificationSettings } from "@/types/notificationSettings";

export const updateNotificationSettings = async (
  id: string,
  data: NotificationSettings
) => {
  const response = await notificationSettingApi.update(id, data);
  return response.data;
};
