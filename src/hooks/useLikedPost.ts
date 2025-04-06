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

export const useLikedPost = ({ initQuery }: PostProps) => {
  const [query, setQuery] = useState<PostQuery>(initQuery);

  const fetchLikedPost = async (query: PostQuery) => {
    const response = await postApi.findLikedPost(query);
    return response.data;
  };

  const { data, isLoading, isFetching, isError, error, status, refetch } =
    useQuery<DataProps>({
      queryKey: ["likedPost", query],
      queryFn: () => fetchLikedPost(query),
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

  return {
    posts: data?.posts,
    totalPost: data?.total || 0,
    loadingPost: isLoading,
    fetchLikedPost: refetch,
    queryPost: query,
    setQueryPost: setQuery,
    debounceSearchMyPost,
    isError,
  };
};
