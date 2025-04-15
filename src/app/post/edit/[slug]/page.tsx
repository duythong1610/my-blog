import { getPostForEdit } from "@/services/post";
import EditPostForm from "../components/EditPostForm";
import { notFound } from "next/navigation";

const EditPostPage = async ({ params }: { params: { slug: string } }) => {
  return <EditPostForm slug={params.slug} />;
};

export default EditPostPage;
