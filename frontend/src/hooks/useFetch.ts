import { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiInterceptor from "./apiInterceptor.js";

interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

interface UseFetchParams {
  url: string;
  queryName: string;
  pageNo?: number;
  pageLimit?: number;
  filters?: Record<string, string | undefined>;
}

interface UseFetchResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  fetchDataHandler: (
    page?: number,
    limit?: number,
    filters?: Record<string, string | undefined>
  ) => void;
  page: number;
  limit: number;
  filters: Record<string, string | undefined>;
}

const useFetch = <T>({
  url,
  queryName,
  pageNo = 1,
  pageLimit = 5,
  filters = {},
}: UseFetchParams): UseFetchResult<T> => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(pageNo);
  const [limit, setLimit] = useState(pageLimit);
  const [appliedFilters, setAppliedFilters] = useState(filters);

  const fetchData = async (
    fetchPage: number,
    fetchLimit: number,
    fetchFilters: Record<string, string | undefined>
  ): Promise<PaginatedResponse<T>> => {
    const params: Record<string, any> = {
      page: fetchPage,
      limit: fetchLimit,
      ...fetchFilters,
    };
    Object.keys(params).forEach((key) => {
      if (params[key] == null || params[key] === "") delete params[key];
    });
    const response = await apiInterceptor.get<PaginatedResponse<T>>(url, { params });
    return response.data;
  };

  const queryKey = [queryName, page, limit, appliedFilters];

  const { data: queryData, isLoading } = useQuery<PaginatedResponse<T>>({
    queryKey,
    queryFn: () => fetchData(page, limit, appliedFilters),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const fetchDataHandler = useCallback(
    (newPage?: number, newLimit?: number, newFilters?: Record<string, string | undefined>) => {
      const nextPage = newPage ?? page;
      const nextLimit = newLimit ?? limit;
      const nextFilters = newFilters ?? appliedFilters;

      setPage(nextPage);
      setLimit(nextLimit);
      setAppliedFilters(nextFilters);

      queryClient.fetchQuery({
        queryKey: [queryName, nextPage, nextLimit, nextFilters],
        queryFn: () => fetchData(nextPage, nextLimit, nextFilters),
      });
    },
    [queryName, page, limit, appliedFilters]
  );

  return {
    data: queryData?.data ?? [],
    currentPage: queryData?.currentPage ?? page,
    totalPages: queryData?.totalPages ?? 0,
    totalItems: queryData?.totalItems ?? 0,
    isLoading,
    fetchDataHandler,
    page,
    limit,
    filters: appliedFilters,
  };
};

export default useFetch;