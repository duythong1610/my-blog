import { logout } from "@/lib/features/users/userSlice";
import { useAppDispatch } from "@/lib/hook";
import { Button, Modal, message } from "antd";
import { Rule } from "antd/lib/form";
import { useRouter } from "next/navigation";
import React, { useImperativeHandle, useState } from "react";

export interface PostSuccessModalRef {
  handleOpen: () => void;
}
interface PostSuccessModalProps {
  onSubmitOk?: () => void;
}

const PostSuccessModal = React.forwardRef(
  ({ onSubmitOk }: PostSuccessModalProps, ref) => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useImperativeHandle<any, PostSuccessModalRef>(
      ref,
      () => ({
        handleOpen() {
          setVisible(true);
        },
      }),
      []
    );

    return (
      <Modal
        centered
        closeIcon={null}
        styles={{
          body: {
            padding: "20px",
          },
        }}
        className="custom-modal"
        onCancel={() => {
          setVisible(false);
        }}
        open={visible}
        // style={{ top: 20 }}
        width={500}
        confirmLoading={loading}
        onOk={() => {
          ("");
        }}
        footer={null}
      >
        <div>
          <h1 className="text-center font-svn text-xl font-bold !uppercase text-purple-500">
            Bài viết đã được gửi đi
          </h1>
          <p className="mb-10 mt-5 text-center text-lg font-medium text-dark">
            Cảm ơn bạn đã đóng góp nội dung cho blog của chúng tôi. Bài viết
            đang được đội ngũ kiểm duyệt xem xét để đảm bảo chất lượng và phù
            hợp với tiêu chí cộng đồng. Bạn sẽ nhận được thông báo ngay khi bài
            viết được phê duyệt và xuất bản.
          </p>
          <div className="flex items-center gap-3">
            <Button
              size="large"
              type="primary"
              className="rounded-[20px] w-[200px] m-auto"
              onClick={() => setVisible(false)}
            >
              Đóng
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);

PostSuccessModal.displayName = "PostSuccessModal";

export default PostSuccessModal;
