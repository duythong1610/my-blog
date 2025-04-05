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

export const useMyPost = ({ initQuery }: PostProps) => {
  const [query, setQuery] = useState<PostQuery>(initQuery);

  const fetchMyPost = async (query: PostQuery) => {
    const response = await postApi.findMyPost(query);
    return response.data;
  };

  const { data, isLoading, isFetching, isError, error, status, refetch } =
    useQuery<DataProps>({
      queryKey: ["myPosts", query],
      queryFn: () => fetchMyPost(query),
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
    fetchMyPost: refetch,
    queryPost: query,
    setQueryPost: setQuery,
    debounceSearchMyPost,
    isError,
  };
};
