import { api } from "../../hooks/api";
import { lazy, useEffect } from "react";
const RideList = lazy(() => import("../../components/Ride/RideList"));
import WithSuspense from "../../components/Loading/WithSuspense";
import Skeleton from '@mui/material/Skeleton';
import ProfileNotFound from "../Error/NotFound";
import { ridesForDriverMap } from "../../utils/ridesForDriver";
import useFetch from "../../hooks/useFetch";
import Pagination from "../../components/Pagination";
import { useFilter } from "../../context/FilterContext";

const RidesForDriver = () => {
    const { setOnApply } = useFilter();
    const {
        data,
        isLoading,
        currentPage,
        totalPages,
        fetchDataHandler,
        page,
        limit
    } = useFetch({
        url: api.ride.ridesForDriver,
        pageNo: 1,
        pageLimit: 5,
        queryName: "ridesForDriver"
    });

    useEffect(() => {
        setOnApply((appliedFilters?: Record<string, string>) => {
            fetchDataHandler(1, limit, appliedFilters || {});
        });
    }, [fetchDataHandler, limit, setOnApply]);

    const renderSkeleton = <><Skeleton variant="text" width={"100%"} />
        <Skeleton variant="rectangular" width={"100%"} height={"40"} /></>;

    return (
        <WithSuspense
            data={data}
            isLoading={isLoading}
            empty={<ProfileNotFound />}
            fallback={renderSkeleton}
        >
            <RideList rides={data} mapper={ridesForDriverMap} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                page={page}
                limit={limit}
                handlePageChange={fetchDataHandler}
            />
        </WithSuspense>
    )
}

export default RidesForDriver;