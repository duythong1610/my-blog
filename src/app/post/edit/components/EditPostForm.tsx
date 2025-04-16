// components/Post/EditPostForm.tsx
"use client";

import { postApi } from "@/api/post.api";
import DynamicMDXEditor from "@/components/DynamicMDXEditor";
import MarkdownRenderer from "@/components/MarkdownRendered";
import PostSuccessModal, {
  PostSuccessModalRef,
} from "@/components/Modal/PostSuccessModal";
import ThumbnailPostUpload from "@/components/Upload/ThumbnailPostUpload";
import { usePostForEdit } from "@/hooks/usePostForEdit";
import { useTag } from "@/hooks/useTag";
import { getPostForEdit } from "@/services/post";
import { Post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message, Select } from "antd";
import { debounce } from "lodash";
import { notFound } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsSendCheck } from "react-icons/bs";

interface Props {
  slug: string;
}

const EditPostForm = ({ slug }: Props) => {
  const [form] = Form.useForm();
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const thumbnail = Form.useWatch("thumbnail", form);
  const postSuccessModalRef = useRef<PostSuccessModalRef>();
  const [editorKey, setEditorKey] = useState(Date.now());

  const { data, isError } = useQuery<Post>({
    queryKey: ["postDetail"],
    queryFn: () => getPostForEdit(slug),
    refetchOnWindowFocus: false,
    gcTime: Infinity,
  });

  const { tags, debounceSearchTag } = useTag({
    initQuery: { page: 1, limit: 10 },
  });

  const debouncedSetMarkdown = useCallback(
    debounce((value) => setMarkdown(value), 300),
    []
  );

  const handleChange = (newMarkdown: string) => {
    debouncedSetMarkdown(newMarkdown);
  };

  const handleSubmit = async (values: {
    id: string;
    title: string;
    thumbnail: string;
    tags: string[];
  }) => {
    try {
      await form.validateFields();
      setLoading(true);

      if (!values.title.trim())
        return message.error("Vui lòng nhập tiêu đề bài viết");
      if (!markdown.trim() || markdown === "# Xin chào") {
        return message.error("Vui lòng nhập nội dung bài viết");
      }

      await postApi.update(values.id, {
        tags: values.tags,
        thumbnail: values.thumbnail,
        title: values.title,
        content: markdown,
      });

      postSuccessModalRef.current?.handleOpen();
      form.resetFields();
      setMarkdown("");
      setEditorKey(Date.now());
    } catch (err) {
      message.error("Cập nhật bài viết thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (isError) {
    notFound();
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data, id: data._id });
      setMarkdown(data.content);
      setEditorKey(Date.now());
    }
  }, [data]);

  return (
    <div className="container mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Cập nhật bài viết</h1>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="thumbnail"
          rules={[{ required: true, message: "Chọn ảnh hiển thị" }]}
        >
          <ThumbnailPostUpload
            onUploadOk={(url) => form.setFieldValue("thumbnail", url)}
            imageUrl={thumbnail}
          />
          <div className="text-center font-medium text-gray-400 mt-3">
            Tỉ lệ ảnh đề xuất - 2:1
          </div>
        </Form.Item>

        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="tags"
          label="Thẻ bài viết"
          rules={[
            { required: true, message: "Chọn thẻ" },
            {
              validator: (_, val) =>
                val?.length > 5
                  ? Promise.reject("Tối đa 5 thẻ")
                  : Promise.resolve(),
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn thẻ"
            size="large"
            onSearch={debounceSearchTag}
            filterOption={false}
            options={tags?.map((tag) => ({ label: tag.name, value: tag._id }))}
          />
        </Form.Item>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Nội dung</label>
          <DynamicMDXEditor
            editorKey={editorKey}
            markdown={markdown}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end mb-8">
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

      <PostSuccessModal ref={postSuccessModalRef} />
    </div>
  );
};

export default EditPostForm;
