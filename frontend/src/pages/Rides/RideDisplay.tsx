import RideDetails from "../../components/RideForPassenger/RideDetails";
import DriveDetails from "../../components/RideForDriver/DriveDetails";
import { useRole } from "../../context/RoleContext";

const RideDisplay = () => {
    const { role } = useRole();
    return (
        <>
            {role === "passenger" && <RideDetails />}
            {role === "driver" && <DriveDetails />}
        </>
    )
}
export default RideDisplay;