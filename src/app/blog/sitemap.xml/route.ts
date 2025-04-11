import { getPost } from "@/services/post";
import { Post } from "@/types/post";

export const revalidate = 3600;

export async function GET() {
  const response = await getPost();

  const urls: {
    loc: string;
    lastmod?: string;
    changefreq?: string;
    priority?: string;
  }[] = [];

  // Các bài viết blog
  response.posts.forEach((post: Post) => {
    urls.push({
      loc: `https://writeflow.asia/blog/${post.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: "1.0",
    });
  });

  // Tạo XML string
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
      </url>`
      )
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
