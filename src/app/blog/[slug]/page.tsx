import { postApi } from "@/api/post.api";
import PostContent from "@/components/Post/PostContent";
import { NextPage } from "next";
interface BlogDetailPageProps {
  params: { slug: string };
}

export const getPostDetail = async (slug: string) => {
  const response = await postApi.findOne(slug);
  return response.data;
};

const BlogDetailPage: NextPage<BlogDetailPageProps> = async ({ params }) => {
  const post = await getPostDetail(params.slug);

  console.log({ post });
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
