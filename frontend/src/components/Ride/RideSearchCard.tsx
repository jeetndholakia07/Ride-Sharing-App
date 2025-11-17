import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import RideRequestBtn from "../Buttons/RideRequestBtn";
import { useConfirmModal } from "../../context/ConfirmModalContext";
import { getUserContext } from "../../context/UserContext";
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
import { getUtilContext } from "../../context/UtilsContext";
import PriceDisplay from "../Ride UI/PriceDisplay";
import StatusDisplay from "../Ride UI/StatusDisplay";
import useMediaQuery from "../../hooks/useMediaQuery";
import ACDisplay from "../Ride UI/ACDisplay";
import FuelTypeDisplay from "../Ride UI/FuelType";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "../Loading/PageLoader";
import { isSameRoute } from "../../utils/matchRoute";

type props = {
    data: any;
};

const RideSearchCard: FC<props> = ({ data }) => {
    const ride = data;
    const { t } = useTranslation();
    const { openModal } = useConfirmModal();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { getRole } = getUserContext();
    const { seats, pickup, dropoff } = getUtilContext();
    const isMedium = useMediaQuery("(min-width: 768px)");
    const handleRedirect = () => navigate("/login");
    const shouldUseRidePriceDirectly = isSameRoute(pickup, dropoff, ride);

    const handleCheckRide = async () => {
        try {
            await apiInterceptor.post(api.ride.checkRide, { driveId: ride.driveId });
        } catch (err) {
            console.error("Error checking ride:", err);
            return null;
        }
    };

    const getRidePrice = async () => {
        if (shouldUseRidePriceDirectly) {
            return { pricePerPerson: ride.pricePerPerson, distanceKm: ride.distanceKm, durationMin: ride.estimatedTimeMin };
        }
        try {
            const payload = {
                from: pickup,
                to: dropoff,
                seats: ride.seatsAvailable,
                vehicleType: ride.vehicleType,
                fuelType: ride.fuelType,
                isAc: ride.isAc
            };
            const response = await apiInterceptor.post(api.public.ridePrice, payload);
            return response.data;
        } catch (err) {
            console.error("Error getting ride price:", err);
            return null;
        }
    };

    const { data: ridePrice, isLoading: isPriceLoading } = useQuery({
        queryKey: ["ridePrice"],
        queryFn: getRidePrice,
        staleTime: 0,
        retry: false,
        refetchOnWindowFocus: false
    });

    const handleConfirmRide = async () => {
        try {
            if (!isAuthenticated) {
                openModal(t("notLogin"), t("messages.redirectLogin"), t("ok"), handleRedirect);
                return;
            }
            if (getRole() !== "passenger") {
                openModal(t("noAccess"), t("messages.passengerRoleRequired"), t("ok"), () => { });
                return;
            }
            openModal(
                t("confirmRide"),
                "",
                t("confirm"),
                () => handleRequestRide(ridePrice.pricePerPerson),
                undefined,
                undefined,
                {
                    from: pickup.address,
                    to: dropoff.address,
                    distance: ridePrice.distanceKm,
                    duration: ridePrice.durationMin,
                    price: ridePrice.pricePerPerson
                }
            );
        } catch (err) {
            console.error("Error confirming ride:", err);
        }
    };

    const handleRequestRide = async (price: any) => {
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
                price: price
            });
            showToast("success", t("messages.rideCreatedSuccess"));
            navigate("/profile/rides");
        } catch (err) {
            console.error("Error creating a ride:", err);
        }
    };

    if (isPriceLoading) {
        return <PageLoader />;
    }

    return (
        <div className="bg-white max-w-md rounded-xl shadow-lg overflow-hidden mx-auto">
            <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 flex flex-col items-center justify-center md:w-28 md:pl-4 md:pr-6 border-b md:border-b-0 md:border-r border-gray-200 py-4 md:py-0">
                    <VehicleImage vehicleType={ride.vehicleType} />
                    <div className="mt-3 flex flex-col items-center space-y-1">
                        <ACDisplay isAc={ride.isAc} />
                        <FuelTypeDisplay fuelType={ride.fuelType} />
                    </div>
                </div>

                <div className="flex-1 flex flex-col p-4 space-y-3">
                    <Location from={ride.from} to={ride.to} dropoff={ride.dropoff} />
                    <Departure departureTime={ride.departureTime} />

                    {isMedium && (
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
                            <PriceDisplay price={ridePrice.pricePerPerson} />
                            <StatusDisplay status={ride.driveStatus} />
                        </div>
                    )}
                    {!isMedium && (<div className="flex flex-col space-y-1">
                        <div className="flex justify-between items-center mb-4">
                            <PriceDisplay price={ridePrice.pricePerPerson} />
                            <StatusDisplay status={ride.driveStatus} />
                        </div>
                        <div className="flex justify-end">
                            <Seats seats={ride.seatsAvailable} isLeft={true} />
                        </div>
                    </div>
                    )}
                    {isMedium && <Seats seats={ride.seatsAvailable} isLeft={true} />}
                </div>
            </div>

            <div className="px-4 pt-4 border-t border-gray-200 flex flex-col">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <DriverImage driverImage={ride.driverProfileImg} driverName={ride.driverName} />
                    <div className="flex-1 flex flex-col">
                        <DriverName driverName={ride.driverName} />
                        {ride.driverRating && <DriverRating driverRating={ride.driverRating} />}
                        <SpecialNote specialNote={ride.specialNote} />
                    </div>
                </div>

                <div className="flex justify-end mb-4">
                    <RideRequestBtn handleClick={handleConfirmRide} />
                </div>
            </div>
        </div>
    )
}
export default RideSearchCard;