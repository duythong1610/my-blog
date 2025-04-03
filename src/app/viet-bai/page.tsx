"use client";

import { postApi } from "@/api/post.api";
import DynamicMDXEditor from "@/components/DynamicMDXEditor";
import MarkdownRenderer from "@/components/MarkdownRendered";
import "@mdxeditor/editor/style.css";
import { Button, Form, Input, message } from "antd";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

const CreatePostPage = () => {
  const [form] = Form.useForm();
  const [markdown, setMarkdown] = useState("# Xin chào");
  const [loading, setLoading] = useState(false);

  // Sử dụng useCallback để tránh tạo lại hàm debounce mỗi lần render
  const debouncedSetMarkdown = useCallback(
    debounce((value) => {
      setMarkdown(value);
      console.log("Markdown đã được cập nhật:", value);
    }, 300),
    []
  );

  const handleChange = (newMarkdown: string) => {
    // Cập nhật UI ngay lập tức nhưng dùng debounce cho việc lưu state
    debouncedSetMarkdown(newMarkdown);
  };

  const handleSubmit = async (values: { title: string }) => {
    try {
      setLoading(true);

      if (!values.title.trim()) {
        message.error("Vui lòng nhập tiêu đề bài viết");
        return;
      }

      if (!markdown.trim() || markdown === "# Xin chào") {
        message.error("Vui lòng nhập nội dung bài viết");
        return;
      }

      await postApi.create({
        title: values.title,
        content: markdown,
      });

      message.success("Đăng bài viết thành công!");

      form.resetFields();
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
      message.error("Có lỗi xảy ra khi đăng bài viết. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Tạo bài viết mới</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ title: "" }}
      >
        <Form.Item
          name="title"
          label="Tiêu đề bài viết"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input
            placeholder="Nhập tiêu đề bài viết"
            size="large"
            className="text-xl"
          />
        </Form.Item>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Nội dung bài viết</label>
          <DynamicMDXEditor markdown={markdown} onChange={handleChange} />
        </div>

        <div className="flex justify-between items-center mb-8">
          <Button type="default" size="large">
            Lưu nháp
          </Button>

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
          >
            Đăng bài viết
          </Button>
        </div>
      </Form>

      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Xem trước</h2>
        <MarkdownRenderer content={markdown} />
      </div>
    </div>
  );
};

export default CreatePostPage;
