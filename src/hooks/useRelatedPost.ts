import { postApi } from "@/api/post.api";
import { Post } from "@/types/post";
import { QueryParam } from "@/types/query";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

export type PostQuery = QueryParam;

interface PostProps {
  initQuery: PostQuery;
}

interface DataProps {
  posts: Post[];
  total: number;
}

export const useRelatedPost = ({ initQuery }: PostProps) => {
  const [query, setQuery] = useState<PostQuery>(initQuery);

  const fetchPost = async (query: PostQuery) => {
    const response = await postApi.findAllRelated(query);
    return response.data;
  };

  const { data, isLoading, isFetching, isError, error, status, refetch } =
    useQuery<DataProps>({
      queryKey: ["relatedPosts", query],
      queryFn: () => fetchPost(query),
      enabled: !!query,
      refetchOnWindowFocus: false,
      gcTime: Infinity,
    });

  const debounceSearchRelatedPosts = useCallback(
    debounce((searchValue: string) => {
      setQuery((prevQuery) => ({ ...prevQuery, search: searchValue }));
    }, 300),
    []
  );

  console.log({ isLoading, isFetching });

  console.log({ status, isError, error });

  return {
    relatedPosts: data?.posts || [],
    totalPost: data?.total || 0,
    loadingRelatedPosts: isLoading,
    fetchRelatedPosts: refetch,
    queryRelatedPosts: query,
    setQueryRelatedPosts: setQuery,
    debounceSearchRelatedPosts,
    isError,
  };
};
