// app/sitemap-xml/route.ts
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function GET() {
  const today = dayjs().format("YYYY-MM-DD");

  const urls = [
    "https://writeflow.asia/opengraph-image.png",
    "https://writeflow.asia/twitter-image.png",
    "https://writeflow.asia/blog",
    "https://writeflow.asia/account/liked-posts",
    "https://writeflow.asia/account/profile",
    "https://writeflow.asia/account/my-posts",
    "https://writeflow.asia/dieu-khoan-su-dung",
    "https://writeflow.asia/account/settings",
    "https://writeflow.asia",
    "https://writeflow.asia/chinh-sach-bao-mat",
    "https://writeflow.asia/login",
    "https://writeflow.asia/register",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${url === "https://writeflow.asia" ? "1.0" : "0.7"}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
