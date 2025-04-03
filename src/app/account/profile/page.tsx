"use client";

import { useEffect, useState } from "react";
import { Form, Input, Upload, Button, Avatar, message, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { authApi } from "@/api/auth.api";
import { getProfile } from "@/lib/features/users/userSlice";
import CloudinaryUpload from "@/components/Upload/AvatarUpload";
import AvatarUpload from "@/components/Upload/AvatarUpload";
import CoverPhotoUpload from "@/components/Upload/CoverPhotoUpload";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

export default function ProfilePage() {
  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.user);

  const coverPhoto = Form.useWatch("coverPhoto", form);
  const avatar = Form.useWatch("avatar", form);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ ...user.info });
    }
  }, [user]);

  // Xử lý submit form
  const handleSubmit = async (values: any) => {
    try {
      const res = await authApi.updateProfile({ ...values });
      message.success("Cập nhật thông tin thành công");
      dispatch(getProfile());
    } catch (error) {}
  };

  return (
    <div className="m-auto">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="flex items-center justify-between  mb-3">
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-xl">Thông tin cá nhân</h1>
            <Link
              href={"/viet-bai"}
              className="text-purple-500 font-medium flex items-center gap-1 leading-[18px] mt-[2px]"
            >
              Preview
              <GoArrowUpRight className="text-lg" />
            </Link>
          </div>
          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit">
              Lưu thông tin
            </Button>
          </Form.Item>
        </div>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div className="bg-gray-50 rounded-xl overflow-hidden">
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
                <div className="absolute -bottom-6 left-5 z-10">
                  <Form.Item label="" name={"avatar"} className="mb-0">
                    <AvatarUpload
                      onUploadOk={(url) =>
                        form.setFieldValue("coverPhoto", url)
                      }
                      imageUrl={avatar}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="pt-10">
                <div className="px-3">
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      { required: true, message: "Vui lòng nhập username" },
                    ]}
                  >
                    <Input placeholder="Nhập username" size="large" />
                  </Form.Item>

                  {/* Full Name */}
                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                      { required: true, message: "Vui lòng nhập họ và tên" },
                    ]}
                  >
                    <Input placeholder="Nhập họ và tên" size="large" />
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
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-3">
              <div className="bg-slate-50 rounded-xl px-3">
                <Form.Item label="Bio" name="bio">
                  <TextArea placeholder="Nhập bio" rows={5} />
                </Form.Item>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
