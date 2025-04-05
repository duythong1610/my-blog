import PostContent from "@/components/Post/PostContent";
import { getPostDetail } from "@/services/post";
import { NextPage } from "next";
interface BlogDetailPageProps {
  params: { slug: string };
}

const BlogDetailPage: NextPage<BlogDetailPageProps> = async ({ params }) => {
  const post = await getPostDetail(params.slug);

  return (
    <div className="max-w-7xl m-auto">
      {/* <FloatButtonGroup /> */}

      <PostContent post={post} slug={params.slug} />

      {/* <div>
        <RelatedPosts post={recentPosts} />
      </div> */}
    </div>
  );
};

export default BlogDetailPage;
