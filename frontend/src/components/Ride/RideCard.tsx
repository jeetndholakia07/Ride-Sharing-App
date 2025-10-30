import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import RideRequestBtn from "../Buttons/RideRequestBtn";
import { useConfirmModal } from "../../context/ConfirmModalContext";
import { useRole } from "../../context/RoleContext";
import useAuth from "../../hooks/useAuth";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { useToast } from "../Toast/ToastContext";
import VehicleImage from "../Ride UI/VehicleImage";
import Location from "../Ride UI/Location";
import Departure from "../Ride UI/Departure";
import Seats from "../Ride UI/Seats";
import DriverImage from "../Ride UI/DriverImage";
import DriverName from "../Ride UI/DriverName";
import DriverRating from "../Ride UI/DriverRating";
import SpecialNote from "../Ride UI/SpecialNote";
import ViewButton from "../Buttons/ViewButton";
import { getUtilContext } from "../../context/UtilsContext";
import PriceDisplay from "../Ride UI/PriceDisplay";
import StatusDisplay from "../Ride UI/StatusDisplay";

type props = {
    data: any;
}

const RideCard: FC<props> = ({ data }) => {
    const ride = data;
    const { t } = useTranslation();
    const { openModal } = useConfirmModal();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { role } = useRole();
    const { seats, typeUsage } = getUtilContext();

    const handleRedirect = () => {
        navigate("/login");
    };

    const handleCheckRide = async () => {
        try {
            await apiInterceptor.post(api.ride.checkRide, { driveId: ride.driveId });
        }
        catch (err) {
            console.error("Error checking ride:", err);
            return null;
        }
    };

    const handleRequestRide = async () => {
        if (!isAuthenticated) {
            openModal(t("notLogin"), t("messages.redirectLogin"), t("ok"), handleRedirect);
            return;
        }
        if (role !== "passenger") {
            openModal(t("noAccess"), t("messages.passengerRoleRequired"), t("ok"), () => { });
            return;
        }
        try {
            const response = await handleCheckRide();
            if (response === null) {
                openModal(t("rideExists"), t("messages.rideExists"), t("ok"), () => { });
                return;
            }
            await apiInterceptor.post(api.ride.createRide, { driveId: ride.driveId, seats: seats });
            showToast("success", t("messages.rideCreatedSuccess"));
            navigate("/profile/rides");
        }
        catch (err) {
            console.error("Error creating a ride:", err);
        }
    };

    const handleView = () => {
        const id = role === "passenger" ? ride.rideId : ride.driveId;
        navigate(`/profile/rides/${id}`, { state: { data: data } });
    };


    return (
        <div className="bg-white max-w-sm rounded-xl shadow-lg overflow-hidden mx-auto">
            <div className="p-4 flex flex-col sm:flex-row flex-wrap items-center space-x-4 space-y-2 sm:space-y-0">
                <VehicleImage vehicleType={ride.vehicleType} />
                <div className="flex-1 min-w-0">
                    <Location from={ride.from} to={ride.to} />
                    <Departure departureTime={ride.departureTime} />
                    <PriceDisplay price={ride.pricePerPerson} />
                </div>
                <StatusDisplay status={ride.driveStatus} />
            </div>
            <Seats seats={ride.seatsAvailable} />

            <div className="px-4 pb-4 border-t border-gray-200">
                {role === "passenger" && (
                    <div className="flex flex-wrap justify-between items-start gap-4">
                        <div className="flex items-start space-x-3 min-w-0">
                            <DriverImage driverImage={ride.driverProfileImg} driverName={ride.driverName} />
                            <div className="min-w-0 mt-4">
                                <DriverName driverName={ride.driverName} />
                                {ride.driverRating && (
                                    <DriverRating driverRating={ride.driverRating} />
                                )}
                                <SpecialNote specialNote={ride.specialNote} />
                            </div>
                        </div>
                    </div>
                )}


                {typeUsage === "ride request" && (
                    <div className="grid grid-cols-1 mb-2">
                        <RideRequestBtn handleClick={handleRequestRide} />
                    </div>
                )}

                {typeUsage === "view" && (
                    <div className="grid grid-cols-1 mt-2 mb-2">
                        <ViewButton handleClick={handleView} />
                    </div>
                )}

            </div>
        </div>
    );
};

export default RideCard;