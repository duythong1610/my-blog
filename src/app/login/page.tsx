"use client";

import { getProfile, login } from "@/lib/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { Button, Form, Input, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";

const { Title, Text } = Typography;

export default function AuthPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  console.log({ user });
  const onFinish = async (values: any) => {
    const { username, password, fullName } = values;
    try {
      await dispatch(login({ username, password }));
      await dispatch(getProfile());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] ">
      <div className="w-96 p-6 shadow-lg rounded-xl bg-white dark:bg-gray-800">
        <Title
          level={2}
          className="text-center text-gray-900 dark:text-gray-200"
        >
          Đăng nhập
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={
              <span className="text-gray-900 dark:text-gray-200">
                Tên người dùng
              </span>
            }
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng!" },
            ]}
          >
            <Input size="large" placeholder="Tên người dùng" />
          </Form.Item>
          <Form.Item
            label={
              <span className="text-gray-900 dark:text-gray-200">Mật khẩu</span>
            }
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password size="large" placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <Text className="text-center block mt-4 text-gray-900 dark:text-gray-200">
          Chưa có tài khoản?{" "}
          <Link href={"/register"} className="!text-purple-500">
            Đăng ký ngay
          </Link>
        </Text>
      </div>
    </div>
  );
}
