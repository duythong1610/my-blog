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

export const usePost = ({ initQuery }: PostProps) => {
  const [query, setQuery] = useState<PostQuery>(initQuery);

  const fetchPost = async (query: PostQuery) => {
    const response = await postApi.findAll(query);
    return response.data;
  };

  const { data, isLoading, isFetching, isError, error, status, refetch } =
    useQuery<DataProps>({
      queryKey: ["posts", query],
      queryFn: () => fetchPost(query),
      enabled: !!query,
      refetchOnWindowFocus: false,
      gcTime: Infinity,
    });

  const debounceSearchPost = useCallback(
    debounce((searchValue: string) => {
      setQuery((prevQuery) => ({ ...prevQuery, search: searchValue }));
    }, 300),
    []
  );

  return {
    posts: data?.posts,
    totalPost: data?.total || 0,
    loadingPost: isLoading,
    fetchPost: refetch,
    queryPost: query,
    setQueryPost: setQuery,
    debounceSearchPost,
    isError,
  };
};
