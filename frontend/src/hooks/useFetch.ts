import { useState } from "react";
import apiInterceptor from "./apiInterceptor.js";

interface PaginatedResponse<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

interface UseFetchParams {
    url: string;
    page: number;
    limit: number;
}

interface UseFetchResult<T> {
    data: T[],
    currentPage: number;
    totalPages: number;
    totalItems: number;
    isLoading: boolean;
    fetchDataHandler: (page?: number, limit?: number) => Promise<void>;
}

const useFetch = <T>({
    url,
    page = 1,
    limit = 10
}: UseFetchParams): UseFetchResult<T> => {
    const [data, setData] = useState<T[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(page);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (pageNo: number = page, pageLimit: number = limit, search?: string,
        filters?: { [key: string]: string | undefined }): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            // Construct query params dynamically
            const params: { [key: string]: any } = {
                page: pageNo,
                limit: pageLimit,
                search,
                ...filters
            };

            // Remove any parameters that are empty strings or undefined
            Object.keys(params).forEach((key) => {
                if (!params[key]) {
                    delete params[key];
                }
            });

            //Get the response
            const response = await apiInterceptor.get<PaginatedResponse<T>>(url, { params });

            const { data, currentPage, totalPages, totalItems } = response.data;
            setData(data);
            setCurrentPage(currentPage);
            setTotalPages(totalPages);
            setTotalItems(totalItems);
        }
        catch (err) {
            setError("Error fetching data:");
            error && console.error(error);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        data,
        currentPage,
        totalPages,
        totalItems,
        isLoading,
        fetchDataHandler: fetchData
    }
}

export default useFetch;