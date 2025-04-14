"use client";

import { authApi } from "@/api/auth.api";
import { getProfile, login } from "@/lib/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { Button, Form, Input, message, Typography } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { usernameRules } from "@/utils/validation"; // import validation

const { Title, Text } = Typography;

export default function AuthPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    normal: false,
    google: false,
    github: false,
  }); // State chung cho tất cả các nút
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { data, status } = useSession();

  const onFinish = async (values: any) => {
    const { username, password } = values;
    setLoading((prev) => ({ ...prev, normal: true }));
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
      setLoading((prev) => ({ ...prev, normal: false }));
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    setLoading((prev) => ({ ...prev, [provider]: true }));
    try {
      await signIn(provider, { callbackUrl: "/", prompt: "select_account" });
    } catch (error) {
      console.error(`OAuth sign-in failed for ${provider}`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [provider]: false })); // Set lại loading khi hoàn thành
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md p-8 shadow-2xl rounded-2xl bg-white dark:bg-[#1f1f1f]">
        <Title
          level={2}
          className="text-center text-gray-900 dark:text-gray-100 mb-6"
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
            rules={usernameRules}
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
              loading={loading.normal} // Dùng loading cho nút đăng nhập bình thường
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-[#1f1f1f] px-3 text-gray-500 dark:text-gray-400">
              Hoặc đăng nhập bằng
            </span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => handleOAuthSignIn("google")}
            icon={<FcGoogle className="text-xl" />}
            className="flex items-center justify-center gap-2 font-medium"
            block
            size="large"
            loading={loading.google} // Dùng loading cho nút Google
          >
            Đăng nhập với Google
          </Button>
          <Button
            onClick={() => handleOAuthSignIn("github")}
            icon={<FaGithub className="text-xl" />}
            className="flex items-center justify-center gap-2 font-medium"
            block
            size="large"
            loading={loading.github} // Dùng loading cho nút Github
          >
            Đăng nhập với Github
          </Button>
        </div>

        <Text className="text-center block mt-6 text-gray-800 dark:text-gray-300">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-purple-600 hover:underline">
            Đăng ký ngay
          </Link>
        </Text>
      </div>
    </div>
  );
}
