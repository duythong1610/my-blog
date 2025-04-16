import { postApi } from "@/api/post.api";
import { Post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface PostForEditProps {
  slug: string;
}

interface PostForEditData {
  post: Post | null;
}

export const usePostForEdit = ({ slug }: PostForEditProps) => {
  const [query, setQuery] = useState({ slug });

  const fetchPostForEdit = async (slug: string) => {
    const response = await postApi.getPostForEdit(slug);
    return response.data;
  };

  const { data, isLoading, isError, error, status, refetch } =
    useQuery<PostForEditData>({
      queryKey: ["postForEdit", query],
      queryFn: () => fetchPostForEdit(query.slug),
      enabled: !!query.slug,
      refetchOnWindowFocus: false,
      gcTime: Infinity,
    });

  return {
    post: data?.post,
    loadingPost: isLoading,
    isError,
    refetchPost: refetch,
    error,
    status,
  };
};
