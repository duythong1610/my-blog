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
  const dispatch = useAppDispatch();

  const { theme } = useTheme();

  const isDark = theme === "dark";

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
    colorTextBase: "#ffffff", // màu chữ chính
    colorTextPlaceholder: "#999999", // màu chữ placeholder
    colorTextLabel: "#ffffff", // màu label form
    colorBgContainer: "#1f1f1f", // nền input
    colorBgElevated: "#141414", // nền popup datepicker, dropdown...
    colorBorder: "#333333", // viền input
    colorSplit: "#444444", // viền separator trong DatePicker
    colorIcon: "#bbbbbb", // màu icon
    colorIconHover: "#ffffff", // màu icon khi hover
    controlItemBgActive: "#222", // màu icon khi hover
  };
  return (
    <ConfigProvider
      theme={{
        token: isDark ? darkTheme : lightTheme,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
