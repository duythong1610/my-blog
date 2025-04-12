import { postApi } from "@/api/post.api";
import { userApi } from "@/api/user.api";
import { Post } from "@/types/post";
import { QueryParam } from "@/types/query";
import { Summary } from "@/types/summary";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

export type SummaryQuery = QueryParam;

interface PostProps {
  initQuery: SummaryQuery;
}

interface DataProps {
  summary: Summary;
}

export const useSummary = ({ initQuery }: PostProps) => {
  const [query, setQuery] = useState<SummaryQuery>(initQuery);

  const fetchSummary = async (query: SummaryQuery) => {
    const response = await userApi.summary(query);
    return response.data;
  };

  const { data, isLoading, isFetching, isError, error, status, refetch } =
    useQuery<DataProps>({
      queryKey: ["summary", query],
      queryFn: () => fetchSummary(query),
      enabled: !!query,
      refetchOnWindowFocus: false,
      gcTime: Infinity,
    });

  const debounceSearchSummary = useCallback(
    debounce((searchValue: string) => {
      setQuery((prevQuery) => ({ ...prevQuery, search: searchValue }));
    }, 300),
    []
  );

  return {
    summary: data?.summary,
    loadingSummary: isLoading,
    fetchSummary: refetch,
    querySummary: query,
    setQuerySummary: setQuery,
    debounceSearchSummary,
    isError,
  };
};
