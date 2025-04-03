import { redirect } from "next/navigation";

export default function AccountPage(): never {
  redirect("/account/profile"); // Mặc định chuyển đến trang Thông tin cá nhân
}
