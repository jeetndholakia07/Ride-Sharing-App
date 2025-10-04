import { Suspense, lazy } from "react";
import { useRole } from "../../context/RoleContext";
import Skeleton from "@mui/material/Skeleton";
const RidesForPassenger = lazy(() => import("../Rides/RidesForPassenger"));
const RidesForDriver = lazy(() => import("../Rides/RidesForDriver"));

const UserRides = () => {
    const { role } = useRole();

    const renderSkeleton = <><Skeleton variant="text" width={"100%"} />
        <Skeleton variant="rectangular" width={"100%"} height={"40"} /></>;

    return (
        <Suspense fallback={renderSkeleton}>
            {role === "passenger" && <RidesForPassenger />}
            {role === "driver" && <RidesForDriver />}
        </Suspense>
    );
};

export default UserRides;