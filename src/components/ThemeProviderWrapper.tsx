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
    colorPrimary: "#1677ff",
    colorTextBase: "#000",
    colorTextLightSolid: "#fff",
  };

  const darkTheme = {
    colorPrimary: "#1677ff",
    colorTextBase: "#fff",
    colorTextLightSolid: "#000",
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
