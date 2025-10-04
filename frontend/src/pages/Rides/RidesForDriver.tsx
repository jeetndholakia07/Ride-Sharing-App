import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { lazy } from "react";
const DriveList = lazy(() => import("../../components/RideForDriver/DriveList"));
import WithSuspense from "../../components/Loading/WithSuspense";
import { useQuery } from "@tanstack/react-query";
import Skeleton from '@mui/material/Skeleton';
import ProfileNotFound from "../../components/Profile/ProfileNotFound";
import { ridesForDriverMap } from "../../utils/ridesForDriver";

const RidesForDriver = () => {

    const getRidesForDriver = async () => {
        try {
            const response = await apiInterceptor.get(api.ride.ridesForDriver);
            return response.data.data;
        }
        catch (err) {
            console.error("Error getting rides for driver:", err);
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ["ridesForDriver"],
        queryFn: getRidesForDriver,
        retry: false,
        refetchOnWindowFocus: false
    });

    const renderSkeleton = <><Skeleton variant="text" width={"100%"} />
        <Skeleton variant="rectangular" width={"100%"} height={"40"} /></>;

    return (
        <WithSuspense
            data={data}
            isLoading={isLoading}
            empty={<ProfileNotFound />}
            fallback={renderSkeleton}
        >
            <DriveList drives={data} mapper={ridesForDriverMap} />
        </WithSuspense>
    )
}

export default RidesForDriver;