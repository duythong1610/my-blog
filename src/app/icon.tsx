// app/icon.tsx hoặc app/icon/route.tsx (tùy theo cấu trúc app directory)

import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <img
        src="https://writeflow.asia/favicon.png"
        alt="icon"
        width={32}
        height={32}
      />
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
