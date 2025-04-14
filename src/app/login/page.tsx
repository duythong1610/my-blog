"use client";

import { authApi } from "@/api/auth.api";
import { getProfile, login } from "@/lib/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { Button, Form, Input, message, Typography } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import {
  GoogleLoginButton,
  FacebookLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";

const { Title, Text } = Typography;

export default function AuthPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { data, status } = useSession();

  const onFinish = async (values: any) => {
    const { username, password } = values;
    setLoading(true);
    try {
      const response = await authApi.login({ username, password });
      if (response.data) {
        dispatch(login(response.data));
        await dispatch(getProfile());
      }

      router.push(redirect);
      message.success("Đăng nhập thành công!");
    } catch (e) {
      console.error("Login or profile fetch failed", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    setLoading(true);
    await signIn(provider, { callbackUrl: "/", prompt: "select_account" });
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] ">
      <div className="w-96 p-6 shadow-lg rounded-xl bg-white dark:bg-[#222]">
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
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <div className="flex flex-col gap-4">
          <GoogleLoginButton onClick={() => handleOAuthSignIn("google")}>
            Đăng nhập với Google
          </GoogleLoginButton>
          {/* <FacebookLoginButton onClick={() => handleOAuthSignIn("facebook")}>
            Đăng nhập với Facebook
          </FacebookLoginButton> */}
          <GithubLoginButton onClick={() => handleOAuthSignIn("github")}>
            Đăng nhập với Github
          </GithubLoginButton>

          {/* Form đăng nhập thông thường nếu cần */}
        </div>
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
