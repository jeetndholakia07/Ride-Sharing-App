import { formatDateTime } from "../../utils/dateFormat";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import NotFound from "../../pages/Error/NotFound";
import { type FC } from "react";
import PageLoader from "../Loading/PageLoader";
import { useQuery } from "@tanstack/react-query";
import { ridesForPassengerMap } from "../../utils/ridesForPassenger";
import StatusDisplay from "../Ride UI/StatusDisplay";
import DriverImage from "../Ride UI/DriverImage";
import PriceDisplay from "../Ride UI/PriceDisplay";
import Seats from "../Ride UI/Seats";
import VehicleImage from "../Ride UI/VehicleImage";
import SpecialNote from "../Ride UI/SpecialNote";
import { getRideStatus } from "../../utils/getRideStatus";

type rideProps = {
    linkId: any;
}

const RideDetails: FC<rideProps> = ({ linkId }) => {
    const location = useLocation();
    const initialData = location.state?.data;
    const linkIdFromState = initialData?.driveId; // fallback linkId
    const linkIdToUse = linkId || linkIdFromState;

    const fetchRide = async () => {
        try {
            const response = await apiInterceptor.get(`${api.ride.rideById}`, { params: { rideId: linkId } });
            return response.data;
        }
        catch (err) {
            console.error("Error fetching ride by id:", err);
            return null;
        }
    };

    const navigate = useNavigate();
    const { t } = useTranslation();

    const hasInitialData = Boolean(initialData);
    const shouldFetch = !hasInitialData && Boolean(linkId);

    const { data: ride, isLoading, isError } = useQuery({
        queryKey: ["ride", linkIdToUse],
        queryFn: fetchRide,
        refetchOnWindowFocus: false,
        initialData: hasInitialData ? initialData : undefined,
        enabled: shouldFetch,
        retry: false,
        select: shouldFetch ? (data: any) => data && ridesForPassengerMap(data) : undefined,
    });

    if (isLoading) return <PageLoader />;

    if (!ride || isError) return <NotFound />;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
            <button
                onClick={() => navigate(-1)}
                className="text-sm mb-4 md:mb-0 text-indigo-600 hover:underline hover:cursor-pointer"
            >
                {t("goback")}
            </button>

            <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">
                    {ride.from} {t("arrow")} {ride.to}
                </h1>
                <p className="mt-2 text-gray-700 font-bold text-sm md:text-base">
                    <i className="bi bi-clock-fill mr-1" /> {t("departure")}  {formatDateTime(ride.departureTime)}
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center md:justify-between">
                <div className="flex items-center space-x-4">
                    <VehicleImage vehicleType={ride.vehicleType} />
                    <div>
                        <span className="text-xl font-semibold text-gray-800">
                            {ride.vehicleName} {ride.vehicleNumber}
                        </span>
                        <p className="mt-1 text-gray-500">{t(ride.vehicleType)}</p>
                    </div>
                </div>
                <StatusDisplay status={getRideStatus(ride)} />
            </div>

            <div className="flex items-center justify-between mb-2">
                <PriceDisplay price={ride.pricePerPerson} />
                <Seats seats={ride.seatsAvailable} />
            </div>

            <hr className="mb-4 border-gray-300" />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center space-x-6 flex-1">
                    <DriverImage driverImage={ride.driverProfileImg} driverName={ride.driverName} />
                    <div>
                        <p className="text-xl font-semibold text-gray-800">{t("driver")} {ride.driverName}</p>
                        <p className="text-gray-500 mt-1">Mobile: {ride.driverMobile}</p>
                        {ride.driverRating && (
                            <div className="mt-2 inline-flex items-center text-yellow-600 font-medium">
                                <i className="bi bi-star-fill text-yellow-500" />
                                <span className="ml-2"> {Number(ride.driverRating).toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-gray-700 space-y-2 mt-2">
                    {ride.specialNote && (
                        <SpecialNote specialNote={ride.specialNote} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RideDetails;