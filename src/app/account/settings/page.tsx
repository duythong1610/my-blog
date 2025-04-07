"use client";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { updateNotificationSettings } from "@/services/notification-settings";
import { NotificationSettings } from "@/types/notificationSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, List, message, Switch, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

const notificationTypes = [
  {
    key: "postApprove",
    title: "Duyệt bài viết",
    description: "Nhận thông báo khi bài viết của bạn được duyệt.",
  },
  {
    key: "postReject",
    title: "Từ chối bài viết",
    description: "Nhận thông báo khi bài viết của bạn bị từ chối.",
  },
  {
    key: "comment",
    title: "Bình luận bài viết",
    description: "Nhận thông báo khi có người bình luận vào bài viết của bạn.",
  },
  {
    key: "reply",
    title: "Phản hồi bình luận",
    description: "Nhận thông báo khi có người phản hồi bình luận của bạn.",
  },
  {
    key: "follow",
    title: "Người theo dõi mới",
    description: "Nhận thông báo khi có người theo dõi bạn.",
  },
];

const NotificationSettingsPage = () => {
  const { notificationSettings } = useNotificationSettings({
    initQuery: {
      page: 1,
      limit: 50,
    },
  });

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

  const updateMutation = handleUpdateNotificationSettings(
    notificationSettings?._id ?? ""
  );

  const handleSave = async () => {
    if (!notificationSettings) return;

    try {
      await updateMutation.mutateAsync({
        ...notificationSettings,
        ...settings,
      });
      message.success("Cập nhật cài đặt thông báo thành công");
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  const [settings, setSettings] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (notificationSettings) {
      setSettings({
        postApprove: notificationSettings.postApprove,
        postReject: notificationSettings.postReject,
        comment: notificationSettings.comment,
        reply: notificationSettings.reply,
        follow: notificationSettings.follow,
      });
    }
  }, [notificationSettings]);

  const toggleSwitch = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-bold text-xl">Cài đặt thông báo</h1>
        <div className="md:block hidden">
          <Button type="primary" htmlType="submit" onClick={() => handleSave()}>
            Lưu cài đặt
          </Button>
        </div>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={notificationTypes}
        renderItem={(item) => (
          <List.Item
            key={item.key}
            actions={[
              <Switch
                checked={settings[item.key]}
                onChange={(checked) => toggleSwitch(item.key, checked)}
              />,
            ]}
          >
            <List.Item.Meta
              title={<Text strong>{item.title}</Text>}
              description={<Text type="secondary">{item.description}</Text>}
            />
          </List.Item>
        )}
      />
      <div className="block md:hidden mt-5">
        <Button
          type="primary"
          size="large"
          block
          htmlType="submit"
          onClick={() => handleSave()}
        >
          Lưu cài đặt
        </Button>
      </div>
    </>
  );
};

export default NotificationSettingsPage;
