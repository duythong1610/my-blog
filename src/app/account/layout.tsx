"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  key: string;
  label: string;
}

const menuItems: MenuItem[] = [
  { key: "/account/profile", label: "Thông tin cá nhân" },
  { key: "/account/my-posts", label: "Bài viết của tôi" },
];

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4">
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={pathname === item.key ? "font-bold" : ""}
              >
                <Link href={item.key}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Nội dung */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
