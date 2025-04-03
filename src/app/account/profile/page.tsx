"use client";

import { useEffect, useState } from "react";
import { Form, Input, Upload, Button, Avatar, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { authApi } from "@/api/auth.api";
import { getProfile } from "@/lib/features/users/userSlice";

export default function ProfilePage() {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ ...user.info });
    }
  }, [user]);

  // Xử lý cập nhật ảnh Avatar
  const handleAvatarChange = (info: any) => {
    if (info.file.status === "done") {
      const url = URL.createObjectURL(info.file.originFileObj);
      setAvatar(url);
    }
  };

  // Xử lý cập nhật ảnh Cover Photo
  const handleCoverChange = (info: any) => {
    if (info.file.status === "done") {
      const url = URL.createObjectURL(info.file.originFileObj);
      setCoverPhoto(url);
    }
  };

  // Xử lý submit form
  const handleSubmit = async (values: any) => {
    try {
      const res = await authApi.updateProfile({ ...values });
      message.success("Cập nhật thông tin thành công");
      dispatch(getProfile());
    } catch (error) {}
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Thông tin cá nhân</h1>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <Avatar size={80} src={avatar} />
        </div>
        <Form.Item label="Avatar">
          <Upload
            showUploadList={false}
            customRequest={() => {}}
            onChange={handleAvatarChange}
          >
            <Button icon={<UploadOutlined />}>Tải lên Avatar</Button>
          </Upload>
        </Form.Item>

        {/* Cover Photo */}
        {coverPhoto && (
          <img
            src={coverPhoto}
            alt="Cover"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        )}
        <Form.Item label="Cover Photo">
          <Upload
            showUploadList={false}
            customRequest={() => {}}
            onChange={handleCoverChange}
          >
            <Button icon={<UploadOutlined />}>Tải lên Cover Photo</Button>
          </Upload>
        </Form.Item>

        {/* Username */}
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập username" }]}
        >
          <Input placeholder="Nhập username" />
        </Form.Item>

        {/* Full Name */}
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Vui lòng nhập email hợp lệ",
            },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Cập nhật thông tin
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
