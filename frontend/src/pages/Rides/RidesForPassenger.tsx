import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { lazy } from "react";
const RideList = lazy(() => import("../../components/RideForPassenger/RideList"));
import WithSuspense from "../../components/Loading/WithSuspense";
import { useQuery } from "@tanstack/react-query";
import Skeleton from '@mui/material/Skeleton';
import ProfileNotFound from "../../components/Profile/ProfileNotFound";
import { ridesForPassengerMap } from "../../utils/ridesForPassenger";

const RidesForPassenger = () => {
    const getRidesForPassenger = async () => {
        try {
            const response = await apiInterceptor.get(api.ride.ridesForRider);
            return response.data.data;
        }
        catch (err) {
            console.error("Error getting rides for passenger:", err);
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ["ridesForPassenger"],
        queryFn: getRidesForPassenger,
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
            <RideList rides={data} mapper={ridesForPassengerMap} />
        </WithSuspense>
    )
}
export default RidesForPassenger;