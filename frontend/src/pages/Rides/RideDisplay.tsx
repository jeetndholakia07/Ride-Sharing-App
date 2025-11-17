import RideDetails from "../../components/Ride/RideDetails";
import DriveDetails from "../../components/Ride/DriveDetails";
import { getUserContext } from "../../context/UserContext";
import { useLocation } from "react-router";

const RideDisplay = () => {
    const { getRole } = getUserContext();
    const role = getRole();
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