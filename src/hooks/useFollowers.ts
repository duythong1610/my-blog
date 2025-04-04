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

export const useFollowers = ({ initQuery }: PostProps) => {
  const [query, setQuery] = useState<PostQuery>(initQuery);

  const fetchFollower = async (query: PostQuery) => {
    const response = await followApi.findAllFollowers(query);
    return response.data;
  };

  const { data, isLoading, isFetching, isError, error, status, refetch } =
    useQuery<DataProps>({
      queryKey: ["followers", query],
      queryFn: () => fetchFollower(query),
      enabled: !!query,
      refetchOnWindowFocus: false,
      gcTime: Infinity,
    });

  const debounceSearchFollowers = useCallback(
    debounce((searchValue: string) => {
      setQuery((prevQuery) => ({ ...prevQuery, search: searchValue }));
    }, 300),
    []
  );

  console.log({ isLoading, isFetching });

  console.log({ status, isError, error });

  return {
    followers: data?.users,
    totalFollowers: data?.total || 0,
    loadingFollowers: isLoading,
    fetchFollower: refetch,
    queryFollowers: query,
    setQueryFollowers: setQuery,
    debounceSearchFollowers,
    isError,
  };
};
