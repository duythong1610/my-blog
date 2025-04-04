import { followApi } from "@/api/follow.api";
import { QueryParam } from "@/types/query";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

export interface PostQuery extends QueryParam {}

interface PostProps {
  initQuery: PostQuery;
}

interface DataProps {
  users: User[];
  total: number;
}

export const useFollowing = ({ initQuery }: PostProps) => {
  const [query, setQuery] = useState<PostQuery>(initQuery);

  const fetchFollower = async (query: PostQuery) => {
    const response = await followApi.findAllFollowing(query);
    return response.data;
  };

  const { data, isLoading, isFetching, isError, error, status, refetch } =
    useQuery<DataProps>({
      queryKey: ["following", query],
      queryFn: () => fetchFollower(query),
      enabled: !!query,
      refetchOnWindowFocus: false,
      gcTime: Infinity,
    });

  const debounceSearchFollowing = useCallback(
    debounce((searchValue: string) => {
      setQuery((prevQuery) => ({ ...prevQuery, search: searchValue }));
    }, 300),
    []
  );

  console.log({ isLoading, isFetching });

  console.log({ status, isError, error });

  return {
    following: data?.users,
    totalFollowing: data?.total || 0,
    loadingFollowing: isLoading,
    fetchFollowing: refetch,
    queryFollowing: query,
    setQueryFollowing: setQuery,
    debounceSearchFollowing,
    isError,
  };
};
