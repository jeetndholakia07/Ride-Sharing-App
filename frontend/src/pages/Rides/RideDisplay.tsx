import RideDetails from "../../components/Ride/RideDetails";
import DriveDetails from "../../components/Ride/DriveDetails";
import { useRole } from "../../context/RoleContext";
import { useLocation } from "react-router";

const RideDisplay = () => {
    const { role } = useRole();
    const location = useLocation();
    const linkId = location?.state.linkId;

    return (
        <>
            {role === "passenger" && <RideDetails linkId={linkId} />}
            {role === "driver" && <DriveDetails linkId={linkId} />}
        </>
    )
}
export default RideDisplay;