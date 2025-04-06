import confetti from "@/assets/images/confetti.png";
import sad from "@/assets/images/sad.png";
import Notification from "@/types/notification";
import { formatTime } from "@/utils/date";
import dayjs from "dayjs";
import Image from "next/image";

interface PropsType {
  onView: (notification: Notification) => void;
  notification: Notification;
}
const NotificationItem = ({ notification, onView }: PropsType) => {
  return (
    <div onClick={() => onView(notification)} title={notification.type}>
      <div className="px-4 py-2 bg-purple-50 rounded-xl cursor-pointer hover:bg-purple-100">
        <h2 className="text-sm font-bold">
          {notification.type == "post_approved" ? (
            <div className="flex items-center gap-2">
              <span>Bài viết đã được duyệt</span>
              <Image
                src={confetti}
                alt={"confetti"}
                className="w-5 h-5"
                width={20}
                height={20}
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Bài viết đã bị từ chối</span>
              <Image
                src={sad}
                alt={"sad"}
                className="w-5 h-5"
                width={20}
                height={20}
              />
            </div>
          )}
        </h2>
        <p className="line-clamp-4">
          {notification.type == "post_approved"
            ? "Chúc mừng! Bài viết của bạn đã được duyệt và sẽ sớm được xuất bản. Cảm ơn bạn đã đóng góp nội dung chất lượng. Hãy tiếp tục theo dõi để biết thêm thông tin chi tiết."
            : "Rất tiếc! Bài viết của bạn không đạt yêu cầu và đã bị từ chối. Vui lòng kiểm tra lại nội dung và gửi lại sau. Chúng tôi mong muốn nhận được những bài viết phù hợp và chất lượng hơn từ bạn."}
        </p>
        <div className="flex items-center gap-1">
          <Image width={16} height={16} src={"/icons/time.svg"} alt="" />
          <span className="text-gray font-bold text-xs opacity-60">
            {formatTime(notification.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
