import confetti from "@/assets/images/confetti.png";
import sad from "@/assets/images/sad.png";
import Notification, { NotificationType } from "@/types/notification";
import { formatTime } from "@/utils/date";
import Image from "next/image";
import { CiClock2 } from "react-icons/ci";

interface PropsType {
  onView: (notification: Notification) => void;
  notification: Notification;
}

const NotificationItem = ({ notification, onView }: PropsType) => {
  const renderContent = () => {
    switch (notification.type) {
      case NotificationType.postApprove:
        return {
          title: (
            <>
              Bài viết đã được duyệt
              <Image
                src={confetti}
                alt="confetti"
                width={20}
                height={20}
                className="ml-2 inline w-5 h-5"
              />
            </>
          ),
          message:
            "Chúc mừng! Bài viết của bạn đã được duyệt. Cảm ơn bạn đã đóng góp nội dung chất lượng.",
        };
      case NotificationType.postReject:
        return {
          title: (
            <>
              Bài viết đã bị từ chối
              <Image
                src={sad}
                alt="sad"
                width={20}
                height={20}
                className="ml-2 inline w-5 h-5"
              />
            </>
          ),
          message:
            "Rất tiếc! Bài viết của bạn không đạt yêu cầu và đã bị từ chối. Vui lòng kiểm tra lại nội dung và gửi lại sau.",
        };
      case "comment":
        return {
          title: "Bình luận mới",
          message: notification.message,
        };
      case "reply":
        return {
          title: "Phản hồi bình luận",
          message: notification.message,
        };
      case "follow":
        return {
          title: "Người theo dõi mới",
          message: notification.message,
        };
      default:
        return {
          title: "Thông báo",
          message: notification.message,
        };
    }
  };

  const { title, message } = renderContent();

  return (
    <div onClick={() => onView(notification)} title={notification.type}>
      <div
        className={`px-4 py-2 ${
          !notification.isRead ? "bg-purple-50 dark:bg-[#222]" : ""
        }  rounded-xl cursor-pointer dark:hover:bg-[#333] hover:bg-purple-100`}
      >
        <h2 className="text-sm font-bold dark:text-white flex items-center gap-2">
          {title}
        </h2>
        <p className="line-clamp-4 dark:text-white">{message}</p>
        <div className="flex items-center gap-1">
          <CiClock2 className="dark:text-white text-lg" />
          <span className="text-gray dark:text-white font-medium text-xs opacity-60">
            {formatTime(notification.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
