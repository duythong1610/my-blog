import { getPost } from "@/services/post";
import { Post } from "@/types/post";

export const revalidate = 3600;

export default async function sitemap() {
  const response = await getPost();

  const post = response.posts.map((post: Post) => ({
    url: `https://writeflow.asia/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  }));

  return [
    {
      url: "https://writeflow.asia/opengraph-image.png",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://writeflow.asia/twitter-image.png",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://writeflow.asia/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://writeflow.asia/account/liked-posts",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://writeflow.asia/account/profile",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://writeflow.asia/account/my-posts",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://writeflow.asia/dieu-khoan-su-dung",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://writeflow.asia/account/settings",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://writeflow.asia",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://writeflow.asia/chinh-sach-bao-mat",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://writeflow.asia/login",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://writeflow.asia/register",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    ...post,
  ];
}
