import dayjs from "dayjs";

export const formatDate = (date?: Date | string | null) => {
  if (!date) return "N/A"; // Trả về N/A nếu không có date
  return dayjs(date).format("DD/MM/YYYY");
};
