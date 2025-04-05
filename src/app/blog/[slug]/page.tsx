import PostContent from "@/components/Post/PostContent";
import { getPostDetail } from "@/services/post";
import { Metadata } from "next";
import { NextPage } from "next";

interface BlogDetailPageProps {
  params: { slug: string };
}

// Metadata cho SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostDetail(params.slug);
  const url = `https://writeflow.whatdaporice.website/blog/${params.slug}`;
  return {
    title: post?.title || "Bài viết",
    description: post?.content || "Chi tiết bài viết",
    openGraph: {
      title: post?.title,
      description: post?.title,
      url,
      siteName: "WriteFlow",
      images: [post?.thumbnail],
      type: "article",
      publishedTime: post?.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post?.title,
      description: post?.title,
      images: [post?.thumbnail],
    },
  };
}

const BlogDetailPage: NextPage<BlogDetailPageProps> = async ({ params }) => {
  const post = await getPostDetail(params.slug);

  // Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.thumbnail,
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "Admin",
    },
    description: post.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://writeflow.whatdaporice.website/blog/${params.slug}`,
    },
  };

  return (
    <div className="max-w-7xl m-auto md:px-4">
      {/* JSON-LD structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PostContent post={post} slug={params.slug} />
    </div>
  );
};

export default BlogDetailPage;
