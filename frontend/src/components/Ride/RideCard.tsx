import { useState, type FC } from "react";
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
import axiosInstance from "../../hooks/axiosInstance";
import useMediaQuery from "../../hooks/useMediaQuery";
import { getRoleBasedProps } from "../../utils/getRoleBasedProps";

type props = {
    data: any;
};

const RideCard: FC<props> = ({ data }) => {
    const ride = data;
    const { t } = useTranslation();
    const { openModal } = useConfirmModal();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { role } = useRole();
    const { seats, typeUsage, pickup, dropoff } = getUtilContext();
    const [price, setPrice] = useState<any>();
    const isMedium = useMediaQuery("(min-width: 768px)");

    const { price: ridePrice, status: rideStatus, seats: rideSeats, isDriver, isPassenger } = getRoleBasedProps(role, ride);

    const handleRedirect = () => navigate("/login");

    const handleCheckRide = async () => {
        try {
            await apiInterceptor.post(api.ride.checkRide, { driveId: ride.driveId });
        } catch (err) {
            console.error("Error checking ride:", err);
            return null;
        }
    };

    const getRidePrice = async () => {
        try {
            const payload = {
                from: pickup,
                to: dropoff,
                seats: ride.seatsAvailable,
                vehicleType: ride.vehicleType,
                fuelType: ride.fuelType,
                isAc: ride.isAc
            };
            const response = await axiosInstance.post(api.public.ridePrice, payload);
            setPrice(response.data);
            return response.data;
        } catch (err) {
            console.error("Error getting ride price:", err);
            return null;
        }
    };

    const handleConfirmRide = async () => {
        try {
            if (!isAuthenticated) {
                openModal(t("notLogin"), t("messages.redirectLogin"), t("ok"), handleRedirect);
                return;
            }
            if (role !== "passenger") {
                openModal(t("noAccess"), t("messages.passengerRoleRequired"), t("ok"), () => { });
                return;
            }
            const priceData = await getRidePrice();
            openModal(
                t("confirmRide"),
                "",
                t("confirm"),
                handleRequestRide,
                undefined,
                undefined,
                {
                    from: pickup.address,
                    to: dropoff.address,
                    distance: priceData.distanceKm,
                    duration: priceData.durationMin,
                    price: priceData.pricePerPerson
                }
            );
        } catch (err) {
            console.error("Error confirming ride:", err);
        }
    };

    const handleRequestRide = async () => {
        try {
            const response = await handleCheckRide();
            if (response === null) {
                openModal(t("rideExists"), t("messages.rideExists"), t("ok"), () => { });
                return;
            }
            await apiInterceptor.post(api.ride.createRide, {
                driveId: ride.driveId,
                seats: seats,
                from: pickup,
                to: dropoff,
                price: price.pricePerPerson
            });
            showToast("success", t("messages.rideCreatedSuccess"));
            navigate("/profile/rides");
        } catch (err) {
            console.error("Error creating a ride:", err);
        }
    };

    const handleView = () => {
        const id = role === "passenger" ? ride.rideId : ride.driveId;
        navigate(`/profile/rides/${id}`, { state: { data: data } });
    };

    return (
        <div className="bg-white max-w-md rounded-xl shadow-lg overflow-hidden mx-auto">
            <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 flex items-center justify-center md:w-28 md:pl-4 md:pr-6 border-b md:border-b-0 md:border-r border-gray-200 py-4 md:py-0">
                    <VehicleImage vehicleType={ride.vehicleType} />
                </div>

                <div className="flex-1 flex flex-col p-4 space-y-3">
                    <Location from={ride.from} to={ride.to} isPassenger={isPassenger} dropoff={ride.dropoff} />
                    <Departure departureTime={ride.departureTime} />

                    {isMedium && (
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
                            <PriceDisplay price={ridePrice} />
                            {isPassenger && <StatusDisplay status={rideStatus} />}
                            {isDriver && <StatusDisplay status={rideStatus} />}
                        </div>
                    )}
                    {!isMedium && (<div className="flex flex-col space-y-1">
                        <div className="flex justify-between items-center mb-4">
                            <PriceDisplay price={ridePrice} />
                            {isPassenger && <StatusDisplay status={rideStatus} />}
                        </div>
                        <div className="flex justify-end">
                            <Seats seats={rideSeats} isLeft={isDriver} />
                            {isDriver && <StatusDisplay status={rideStatus} />}
                        </div>
                    </div>
                    )}
                    {isMedium && <Seats seats={rideSeats} isLeft={isDriver} />}
                </div>
            </div>

            <div className="px-4 pt-4 border-t border-gray-200 flex flex-col">
                {isPassenger && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                        <DriverImage driverImage={ride.driverProfileImg} driverName={ride.driverName} />
                        <div className="flex-1 flex flex-col">
                            <DriverName driverName={ride.driverName} />
                            {ride.driverRating && <DriverRating driverRating={ride.driverRating} />}
                            <SpecialNote specialNote={ride.specialNote} />
                        </div>
                    </div>
                )}

                <div className="flex justify-end mb-4">
                    {typeUsage === "ride request" && <RideRequestBtn handleClick={handleConfirmRide} />}
                    {typeUsage === "view" && <ViewButton handleClick={handleView} />}
                </div>
            </div>
        </div>
    );
};

export default RideCard;
