import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      "https://writeflow.asia/sitemap.xml",
      "https://writeflow.asia/blog-sitemap.xml",
    ],
  };
}
