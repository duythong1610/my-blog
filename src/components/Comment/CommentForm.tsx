import React from "react";
import { Form, Button } from "antd";
import { BsSendCheck } from "react-icons/bs";
import { useCreateComment } from "@/hooks/useCommentMutation";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/lib/input/TextArea";

interface CommentFormProps {
  postId: string;
  parentId?: string;
  currentUser: any;
  onSuccess?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  parentId,
  currentUser,
  onSuccess,
}) => {
  const { mutate: createComment, isPending } = useCreateComment({
    postId,
    currentUser,
  });
  const [form] = useForm();
  const content = Form.useWatch("content", form);

  const handleSubmit = (values: any) => {
    const { content } = values;
    if (content.trim()) {
      createComment(
        {
          postId,
          content,
          parentId,
        },
        {
          onSuccess: () => {
            form.resetFields();
            onSuccess?.();
          },
        }
      );
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className="bg-white dark:bg-[#222] rounded-lg p-4 shadow-sm"
    >
      <div className="flex items-start space-x-3">
        <img
          src={currentUser?.avatar || ""}
          alt={currentUser?.fullName}
          className="w-8 h-8 rounded-full mr-2 object-cover"
        />
        <div className="flex-1">
          <Form.Item name="content">
            <textarea
              placeholder="Viết bình luận"
              rows={3}
              disabled={isPending}
              className="outline-none w-full dark:text-white dark:bg-transparent"
            />
          </Form.Item>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="primary"
          htmlType="submit"
          icon={<BsSendCheck />}
          disabled={!content?.trim() || isPending}
          className="dark:disabled:text-gray-500"
        >
          Gửi bình luận
        </Button>
      </div>
    </Form>
  );
};

export default CommentForm;
