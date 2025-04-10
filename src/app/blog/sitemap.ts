import { getPost } from "@/services/post";
import { Post } from "@/types/post";
import { MetadataRoute } from "next";

export async function generateSitemaps() {
  // Fetch the total count of posts
  const response = await getPost();
  const totalPosts = response.posts.length;

  // Calculate how many posts per sitemap (e.g., 1000 posts per sitemap)
  const postsPerSitemap = 1000;
  const sitemapCount = Math.ceil(totalPosts / postsPerSitemap);

  // Return an array of sitemap segments
  return Array.from({ length: sitemapCount }, (_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Fetch all posts
  const response = await getPost();
  const allPosts = response.posts;

  // Calculate the slice of posts for this specific sitemap
  const postsPerSitemap = 1000;
  const start = id * postsPerSitemap;
  const end = start + postsPerSitemap;
  const sitemapPosts = allPosts.slice(start, end);

  // Generate sitemap entries for this segment
  return sitemapPosts.map((post: Post) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }));
}
