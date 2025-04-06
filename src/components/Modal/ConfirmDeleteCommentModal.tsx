import { Button, Modal } from "antd";
import React, { useImperativeHandle, useState } from "react";

export interface ConfirmDeleteCommentModalRef {
  handleOpen: (commentId: string) => void;
}
interface ConfirmDeleteCommentModalProps {
  onSubmitOk?: (commentId: string) => void;
}

const ConfirmDeleteCommentModal = React.forwardRef(
  ({ onSubmitOk }: ConfirmDeleteCommentModalProps, ref) => {
    const [visible, setVisible] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState<string>("");

    useImperativeHandle<any, ConfirmDeleteCommentModalRef>(
      ref,
      () => ({
        handleOpen(commentId) {
          setSelectedCommentId(commentId);
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
        width={400}
        footer={null}
      >
        <div>
          <h1 className="text-center font-svn text-xl font-bold !uppercase text-purple-500">
            Xóa bình luận
          </h1>
          <p className="mb-10 mt-5 text-center text-lg font-medium text-dark">
            Bạn có chắc chắn muốn xóa bình luận này chứ?
          </p>
          <div className="flex items-center gap-3">
            <Button
              block
              size="large"
              className="rounded-[20px] "
              onClick={() => setVisible(false)}
            >
              Đóng
            </Button>
            <Button
              block
              size="large"
              type="primary"
              className="rounded-[20px]"
              onClick={() => {
                onSubmitOk?.(selectedCommentId);
                setVisible(false);
              }}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);

ConfirmDeleteCommentModal.displayName = "ConfirmDeleteCommentModal";

export default ConfirmDeleteCommentModal;
