"use client";

import { authApi } from "@/api/auth.api";
import { getProfile, login } from "@/lib/features/users/userSlice";
import { useAppDispatch } from "@/lib/hook";
import { Button, Form, Input, message, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function AuthPage() {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      await authApi.register({ ...values });
      message.success("Đăng ký thành công!");
      router.push("/login");
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
          Đăng ký
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
            <Input
              size="large"
              placeholder="Nhập tên người dùng"
              className="dark:bg-gray-700 dark:text-white"
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="text-gray-900 dark:text-gray-200">
                Họ và tên
              </span>
            }
            name="fullName"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng!" },
            ]}
          >
            <Input
              size="large"
              placeholder="Nhập họ và tên"
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
              size="large"
              placeholder="Mật khẩu"
              className="dark:bg-gray-700 dark:text-white"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <Text className="text-center block mt-4 text-gray-900 dark:text-gray-200">
          Đã có tài khoản? {""}
          <Link href={"/login"} className="!text-purple-500">
            Đăng nhập ngay
          </Link>
        </Text>
      </div>
    </div>
  );
}
