"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hook";
import { getProfile } from "@/lib/features/users/userSlice";
import { getToken } from "@/utils/auth";

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme(); // Hook để lấy theme từ next-themes
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(getProfile());
    }
  }, []);

  const lightTheme = {
    colorPrimary: "#a855f7",
    fontFamily: `__Raleway_2c93db', '__Raleway_Fallback_2c93db`,
  };

  const darkTheme = {
    colorPrimary: "#a855f7",
    fontFamily: `__Raleway_2c93db', '__Raleway_Fallback_2c93db`,
  };

  return (
    <ConfigProvider
      theme={{
        token: theme === "dark" ? darkTheme : lightTheme,
      }}
    >
      <AntdRegistry>
        <ThemeProvider attribute="data-mode">{children}</ThemeProvider>
      </AntdRegistry>
    </ConfigProvider>
  );
}
