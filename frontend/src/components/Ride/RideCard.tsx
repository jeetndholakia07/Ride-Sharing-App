import { type FC } from "react";
import { rideMap } from "../../utils/rideMapLocation";
import { formatDateTime } from "../../utils/dateFormat";
import { getStatusColor, getStatusIcon, getVehicleIcon } from "../../utils/rideFormat";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import ReadMoreBtn from "../Buttons/ReadMoreBtn";
import RideRequestBtn from "../Buttons/RideRequestBtn";

type props = {
    data: any;
}

const RideCard: FC<props> = ({ data }) => {
    const ride = rideMap(data);
    const icon = getVehicleIcon(String(ride.vehicleType));
    const statusColor = getStatusColor(String(ride.driveStatus));
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleReadMore = () => {
        navigate(`/rides/${ride.rideId}`, { state: { data: data } });
    }

    return (
        <div className="bg-white max-w-sm rounded-xl shadow-lg overflow-hidden mx-auto">
            <div className="p-4 flex flex-col sm:flex-row flex-wrap items-center space-x-4 space-y-2 sm:space-y-0">

                {/* Vehicle Icon */}
                <img src={icon} alt={String(ride.vehicleType)} className="mt-2 h-[4rem] w-[4rem] object-cover flex-shrink-0" />

                <div className="flex-1 min-w-0">
                    {/* From -> To */}
                    <div className="flex flex-wrap items-center space-x-2">
                        <span className="text-lg font-bold text-gray-800">{ride.from}</span>
                        <span className="text-gray-500 text-md font-bold"><i className="bi bi-arrow-right" /></span>
                        <span className="text-lg font-bold text-gray-800">{ride.to}</span>
                    </div>

                    {/* Departure time */}
                    <div className="mt-1 flex items-center space-x-2 text-gray-500 text-sm">
                        <i className="bi bi-clock-fill text-gray-700"></i>
                        <span>{formatDateTime(ride.createdAt)}</span>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0 mt-2 sm:mt-0">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor}`}
                    >
                        {getStatusIcon(String(ride.driveStatus))}{ride.driveStatus}
                    </span>
                </div>
            </div>

            <div className="px-4 pb-4 border-t border-gray-200">
                <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex items-start space-x-3 min-w-0">
                        <img
                            src={String(ride.driverProfileImg)}
                            alt={String(ride.driverName)}
                            className="mt-3 h-[4rem] w-[4rem] rounded-full object-cover border border-gray-200 flex-shrink-0"
                        />
                        <div className="min-w-0 mt-4">
                            <p className="text-gray-800 font-semibold">{ride.driverName}</p>
                            {ride.driverRating && (
                                <p className="text-gray-500 text-sm flex items-center mb-1">
                                    <i className="bi bi-star-fill text-yellow-500 text-sm mr-1"></i> {Number(ride.driverRating)?.toFixed(1)}
                                </p>
                            )}
                            {ride.specialNote && (
                                <p className="text-gray-600 text-sm whitespace-normal break-words">
                                    {ride.specialNote}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Seats info */}
                    <div className="text-right min-w-max whitespace-nowrap text-gray-500 text-sm font-bold">
                        <p className="text-gray-500 whitespace-nowrap text-sm">{ride.seatsAvailable} {t("seat")}{Number(ride.seatsAvailable) > 1 ? "s" : ""} {t("left")}</p>
                    </div>
                </div>

                {/* Read More */}
                <div className="flex justify-between items-center mt-2">
                    <ReadMoreBtn handleClick={handleReadMore} />
                    <RideRequestBtn />
                </div>
            </div>
        </div>
    );
};

export default RideCard;