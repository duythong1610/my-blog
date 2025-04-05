import { logout } from "@/lib/features/users/userSlice";
import { useAppDispatch } from "@/lib/hook";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";
import React, { useImperativeHandle, useState } from "react";

export interface ConfirmLogoutModalRef {
  handleOpen: () => void;
}

const ConfirmLogoutModal = React.forwardRef(({}, ref) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    setVisible(false);
    dispatch(logout());
    router.push("/auth");
  };

  useImperativeHandle<any, ConfirmLogoutModalRef>(
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
      width={400}
      onOk={() => {
        ("");
      }}
      footer={null}
    >
      <div>
        <h1 className="text-center font-svn text-xl font-bold !uppercase text-purple-500">
          Đăng xuất
        </h1>
        <p className="mb-10 mt-5 text-center text-lg font-medium text-dark">
          Bạn có thật sự muốn đăng xuất tài khoản ra khỏi hệ thống?
        </p>
        <div className="flex items-center gap-3">
          <Button
            block
            onClick={() => setVisible(false)}
            className="rounded-[20px]"
          >
            Đóng
          </Button>
          <Button
            type="primary"
            className="rounded-[20px]"
            block
            onClick={() => {
              handleLogout();
            }}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </Modal>
  );
});

ConfirmLogoutModal.displayName = "ConfirmLogoutModal";

export default ConfirmLogoutModal;
