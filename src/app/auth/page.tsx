"use client";

import { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { getProfile, login } from "@/lib/features/users/userSlice";

const { Title, Text } = Typography;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  console.log({ user });
  const onFinish = async (values: any) => {
    const { username, password } = values;
    try {
      await dispatch(login({ username, password }));
      await dispatch(getProfile());
    } catch (e) {}
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-96 p-6 shadow-lg rounded-xl bg-white dark:bg-gray-800">
        <Title
          level={2}
          className="text-center text-gray-900 dark:text-gray-200"
        >
          {isLogin ? "Đăng nhập" : "Đăng ký"}
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          {!isLogin && (
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
              <Input
                placeholder="Tên người dùng"
                className="dark:bg-gray-700 dark:text-white"
              />
            </Form.Item>
          )}
          <Form.Item
            label={
              <span className="text-gray-900 dark:text-gray-200">
                Tên người dùng
              </span>
            }
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập username!" }]}
          >
            <Input
              placeholder="Username"
              className="dark:bg-gray-700 dark:text-white"
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="text-gray-900 dark:text-gray-200">Mật khẩu</span>
            }
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              placeholder="Mật khẩu"
              className="dark:bg-gray-700 dark:text-white"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </Button>
          </Form.Item>
        </Form>
        <Text className="text-center block mt-4 text-gray-900 dark:text-gray-200">
          {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
          <a
            className="text-blue-500 dark:text-blue-400"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Đăng ký ngay" : "Đăng nhập ngay"}
          </a>
        </Text>
      </div>
    </div>
  );
}
