import { Suspense, lazy } from "react";
import { getUserContext } from "../../context/UserContext";
import Skeleton from "@mui/material/Skeleton";
const RidesForPassenger = lazy(() => import("../Rides/RidesForPassenger"));
const RidesForDriver = lazy(() => import("../Rides/RidesForDriver"));
const Filter = lazy(() => import("../../components/Filter"));

const UserRides = () => {
    const { getRole } = getUserContext();
    const role = getRole();

    const renderSkeleton = <><Skeleton variant="text" width={"100%"} />
        <Skeleton variant="rectangular" width={"100%"} height={"40"} /></>;

    return (
        <Suspense fallback={renderSkeleton}>
            <div className="relative">
                <div className="flex justify-center md:absolute top-0 right-5">
                    <Filter />
                </div>
            </div>
            <div className="flex justify-between items-start gap-6 p-4">
                {/* Main content */}
                <div className="flex-1">
                    {role === "passenger" && <RidesForPassenger />}
                    {role === "driver" && <RidesForDriver />}
                </div>
            </div>
        </Suspense>
    )
}

export default UserRides;