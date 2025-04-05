import { postApi } from "@/api/post.api";
import { Post } from "@/types/post";
import { QueryParam } from "@/types/query";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

export interface PostQuery extends QueryParam {}

interface PostProps {
  initQuery: PostQuery;
}

interface DataProps {
  posts: Post[];
  total: number;
}

export const usePostsByUser = ({ initQuery }: PostProps) => {
  const [query, setQuery] = useState<PostQuery>(initQuery);

  const fetchPostsByUser = async (query: PostQuery) => {
    const response = await postApi.findAll(query);
    return response.data;
  };

  const { data, isLoading, isFetching, isError, error, status, refetch } =
    useQuery<DataProps>({
      queryKey: ["postsByUser", query],
      queryFn: () => fetchPostsByUser(query),
      enabled: !!query,
      refetchOnWindowFocus: false,
      gcTime: Infinity,
    });

  const debounceSearchMyPost = useCallback(
    debounce((searchValue: string) => {
      setQuery((prevQuery) => ({ ...prevQuery, search: searchValue }));
    }, 300),
    []
  );

  console.log({ isLoading, isFetching });

  console.log({ status, isError, error });

  return {
    posts: data?.posts,
    totalPost: data?.total || 0,
    loadingPost: isLoading,
    fetchPostsByUser: refetch,
    queryPost: query,
    setQueryPost: setQuery,
    debounceSearchMyPost,
    isError,
  };
};
