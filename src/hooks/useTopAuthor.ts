import { postApi } from "@/api/post.api";
import { userApi } from "@/api/user.api";
import { Post } from "@/types/post";
import { QueryParam } from "@/types/query";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

export type AuthorQuery = QueryParam;

interface AuthorProps {
  initQuery: AuthorQuery;
}

interface DataProps {
  users: User[];
  total: number;
}

export const useTopAuthor = ({ initQuery }: AuthorProps) => {
  const [query, setQuery] = useState<AuthorQuery>(initQuery);

  const fetchTopAuthors = async (query: AuthorQuery) => {
    const response = await userApi.findTopAuthor(query);
    return response.data;
  };

  const { data, isLoading, isFetching, isError, error, status, refetch } =
    useQuery<DataProps>({
      queryKey: ["users", query],
      queryFn: () => fetchTopAuthors(query),
      enabled: !!query,
      refetchOnWindowFocus: false,
      gcTime: Infinity,
    });

  const debounceSearchAuthors = useCallback(
    debounce((searchValue: string) => {
      setQuery((prevQuery) => ({ ...prevQuery, search: searchValue }));
    }, 300),
    []
  );

  console.log({ isLoading, isFetching });

  console.log({ status, isError, error });

  return {
    users: data?.users,
    totalAuthors: data?.total || 0,
    loadingAuthors: isLoading,
    fetchTopAuthors: refetch,
    queryAuthors: query,
    setQueryAuthors: setQuery,
    debounceSearchAuthors,
    isError,
  };
};
