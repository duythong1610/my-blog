"use client";

import DynamicMDXEditor from "@/components/DynamicMDXEditor";
import MarkdownRenderer from "@/components/MarkdownRendered";
import { ConfirmLogoutModalRef } from "@/components/Modal/ConfirmLogoutModal";
import PostSuccessModal from "@/components/Modal/PostSuccessModal";
import ThumbnailPostUpload from "@/components/Upload/ThumbnailPostUpload";
import { useTag } from "@/hooks/useTag";
import "@mdxeditor/editor/style.css";
import { Button, Form, Input, message, Select } from "antd";
import { debounce } from "lodash";
import { useCallback, useRef, useState } from "react";
import { BsSendCheck } from "react-icons/bs";

const CreatePostPage = () => {
  const [form] = Form.useForm();
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const thumbnail = Form.useWatch("thumbnail", form);
  const confirmLogoutModalRef = useRef<ConfirmLogoutModalRef>();
  const [editorKey, setEditorKey] = useState(Date.now());

  const { tags } = useTag({
    initQuery: {
      page: 1,
      limit: 10,
    },
  });

  // Sử dụng useCallback để tránh tạo lại hàm debounce mỗi lần render
  const debouncedSetMarkdown = useCallback(
    debounce((value) => {
      setMarkdown(value);
      console.log("Markdown đã được cập nhật:", value);
    }, 300),
    []
  );

  const handleChange = (newMarkdown: string) => {
    debouncedSetMarkdown(newMarkdown);
  };

  const handleSubmit = async (values: {
    title: string;
    thumbnail: string;
    tags: string[];
  }) => {
    try {
      setLoading(true);

      // if (!values.title.trim()) {
      //   message.error("Vui lòng nhập tiêu đề bài viết");
      //   return;
      // }

      // if (!markdown.trim() || markdown === "# Xin chào") {
      //   message.error("Vui lòng nhập nội dung bài viết");
      //   return;
      // }

      // await postApi.create({
      //   tags: values.tags,
      //   thumbnail: values.thumbnail,
      //   title: values.title,
      //   content: markdown,
      // });

      confirmLogoutModalRef.current?.handleOpen();

      form.resetFields();
      setMarkdown("");
      setEditorKey(Date.now());
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
        <Form.Item label="" name={"thumbnail"}>
          <ThumbnailPostUpload
            onUploadOk={(url) => form.setFieldValue("thumbnail", url)}
            imageUrl={thumbnail}
          />
        </Form.Item>
        <Form.Item
          name="title"
          label="Tiêu đề bài viết"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input placeholder="Nhập tiêu đề bài viết" size="large" />
        </Form.Item>
        <Form.Item
          name="tags"
          label="Thẻ bài viết"
          rules={[
            { required: true, message: "Vui lòng chọn thẻ bài viết" },
            {
              validator: (_, value) => {
                if (value && value.length > 5) {
                  return Promise.reject("Chỉ được chọn tối đa 5 thẻ");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn thẻ bài viết"
            size="large"
            options={tags?.map((tag) => ({
              label: tag.name,
              value: tag._id,
            }))}
          />
        </Form.Item>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Nội dung bài viết</label>
          <DynamicMDXEditor
            editorKey={editorKey}
            markdown={markdown}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between items-center mb-8">
          <div></div>
          {/* <Button type="default" size="large">
            Lưu nháp
          </Button> */}

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            icon={<BsSendCheck />}
          >
            Gửi bài viết
          </Button>
        </div>
      </Form>

      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Xem trước</h2>
        <MarkdownRenderer content={markdown} />
      </div>
      <PostSuccessModal ref={confirmLogoutModalRef} />
    </div>
  );
};

CreatePostPage.hideFooter = true;

export default CreatePostPage;
