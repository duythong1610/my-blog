import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date?: Date | string | null) => {
  if (!date) return "N/A";
  return dayjs(date).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
};

export const formatTime = (date?: Date | string | null) => {
  return dayjs(date).fromNow();
};
