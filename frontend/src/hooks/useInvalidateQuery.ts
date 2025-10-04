import { useQueryClient } from "@tanstack/react-query";

export default function useInvalidateQuery() {
    const queryClient = useQueryClient();

    return (key: any) => {
        queryClient.invalidateQueries({ queryKey: key });
    };
}