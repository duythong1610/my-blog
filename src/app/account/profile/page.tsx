"use client";

import { authApi } from "@/api/auth.api";
import AvatarUpload from "@/components/Upload/AvatarUpload";
import CoverPhotoUpload from "@/components/Upload/CoverPhotoUpload";
import { getProfile } from "@/lib/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { Button, Col, DatePicker, Form, Input, message, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";

export default function ProfilePage() {
  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const coverPhoto = Form.useWatch("coverPhoto", form);
  const avatar = Form.useWatch("avatar", form);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.info) {
      form.setFieldsValue({
        ...user.info,
        dateOfBirth: user.info.dateOfBirth
          ? dayjs(user.info.dateOfBirth)
          : null,
      });
    }
  }, [user]);

  // Xử lý submit form
  const handleSubmit = async (values: any) => {
    const formattedValues = {
      ...values,
      dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : null,
    };
    setLoading(true);
    try {
      await authApi.updateProfile({ ...formattedValues });
      message.success("Cập nhật thông tin thành công");
      dispatch(getProfile());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-auto">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-xl dark:text-white">
              Tài khoản của tôi
            </h1>
            <Link
              target="_blank"
              href={`/user/${user.info?.username}`}
              className="text-purple-500 font-medium flex items-center gap-1 leading-[18px] mt-[2px]"
            >
              Chế độ xem
              <GoArrowUpRight className="text-lg" />
            </Link>
          </div>
          <Form.Item className="mb-0 hidden md:block">
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu thông tin
            </Button>
          </Form.Item>
        </div>

        <div className="flex md:flex-row flex-col gap-4 items-center">
          <div className="w-full md:w-1/2">
            <div className="bg-gray-50  dark:bg-[#222] rounded-xl overflow-hidden">
              <div className="relative h-[200px]">
                <div className="absolute w-full z-0">
                  <Form.Item label="" name={"coverPhoto"}>
                    <CoverPhotoUpload
                      onUploadOk={(url) =>
                        form.setFieldValue("coverPhoto", url)
                      }
                      imageUrl={coverPhoto}
                    />
                  </Form.Item>
                </div>
                <div className="absolute -bottom-10 md:-bottom-6 left-5 z-10">
                  <Form.Item label="" name={"avatar"} className="mb-0">
                    <AvatarUpload
                      onUploadOk={(url) => form.setFieldValue("avatar", url)}
                      imageUrl={avatar}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="pt-[50px]">
                <div className="px-3 pb-3">
                  <h1 className="text-lg font-bold mb-2">Thông tin cá nhân</h1>
                  <Form.Item
                    label={"Tên đăng nhập"}
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nhập tên đăng nhập"
                      size="large"
                      readOnly
                    />
                  </Form.Item>

                  {/* Full Name */}
                  <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[
                      { required: true, message: "Vui lòng nhập họ và tên" },
                    ]}
                  >
                    <Input placeholder="Nhập họ và tên" size="large" />
                  </Form.Item>

                  <Form.Item label="Ngày sinh" name="dateOfBirth">
                    <DatePicker
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      className="w-full"
                      size="large"
                    />
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
                    <Input placeholder="Nhập email" size="large" />
                  </Form.Item>
                  <Form.Item label="Số điện thoại" name="phone">
                    <Input placeholder="Nhập số điện thoại" size="large" />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex flex-col gap-3">
              <div className="bg-slate-50 dark:bg-[#222] rounded-xl p-3">
                <h1 className="text-lg font-bold mb-2">Giới thiệu</h1>
                <Form.Item label="" name="bio">
                  <TextArea placeholder="Nhập bio" rows={6} />
                </Form.Item>
              </div>

              <div className="bg-slate-50 dark:bg-[#222] rounded-xl p-3">
                <h1 className="text-lg font-bold mb-2">
                  Tài khoản mạng xã hội
                </h1>
                <Form.Item label="Facebook" name={["socialMedia", "facebook"]}>
                  <Input
                    prefix={<FaFacebook className="!text-lg" />}
                    placeholder="Nhập link facebook"
                    size="large"
                  />
                </Form.Item>
                <Form.Item label="Twitter" name={["socialMedia", "twitter"]}>
                  <Input
                    prefix={<FaXTwitter className="!text-lg" />}
                    placeholder="Nhập link twitter"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  label="Instagram"
                  name={["socialMedia", "instagram"]}
                >
                  <Input
                    prefix={<FaInstagram className="!text-lg" />}
                    placeholder="Nhập link instagram"
                    size="large"
                  />
                </Form.Item>
                <Form.Item label="Linkedin" name={["socialMedia", "linkedin"]}>
                  <Input
                    prefix={<FaLinkedin className="!text-lg" />}
                    placeholder="Nhập link linkedin"
                    size="large"
                  />
                </Form.Item>
                <Form.Item label="Github" name={["socialMedia", "github"]}>
                  <Input
                    prefix={<FaGithub className="!text-lg" />}
                    placeholder="Nhập link github"
                    size="large"
                  />
                </Form.Item>
              </div>
              <Form.Item className="mb-0 md:hidden block">
                <Button
                  type="primary"
                  block
                  size="large"
                  htmlType="submit"
                  loading={loading}
                >
                  Lưu thông tin
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
