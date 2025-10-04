import { getStatusColor, getStatusIcon, getVehicleIcon } from "../../utils/rideFormat";
import { formatDateTime } from "../../utils/dateFormat";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { useToast } from "../Toast/ToastContext";
import CancelButton from "../Buttons/CancelButton";
import ProfileNotFound from "../Profile/ProfileNotFound";
import { useConfirmModal } from "../../context/ConfirmModalContext";

const RideDetails = () => {
    const location = useLocation();
    const data = location.state?.data;
    if (!data) {
        return <ProfileNotFound />
    }
    const ride = data;
    const vehicleIcon = getVehicleIcon(String(ride.vehicleType));
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { showToast } = useToast();
    const { openModal } = useConfirmModal();

    const handleRejectRide = async () => {
        try {
            await apiInterceptor.put(api.ride.rejectRide, { driveId: data.driveId });
            showToast("success", t("messages.rejectRideSuccess"));
            navigate("/profile/rides");
        }
        catch (err) {
            console.error("Error rejecting ride:", err);
        }
    };

    const confirmReject = () => {
        openModal(t("confirmReject"), t("messages.confirmRejectRide"), t("confirm"), handleRejectRide);
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
            <button
                onClick={() => navigate(-1)}
                className="text-sm mb-4 md:mb-0 text-indigo-600 hover:underline hover:cursor-pointer"
            >
                {t("goback")}
            </button>
            {/* Header: From To + Time */}
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">
                    {ride.from} {t("arrow")} {ride.to}
                </h1>
                <p className="mt-2 text-gray-700 font-bold text-sm md:text-base">
                    <i className="bi bi-clock-fill mr-1" /> {t("departure")}  {formatDateTime(ride.departureTime)}
                </p>
            </div>

            {/* Vehicle Info + Status */}
            <div className="flex flex-col md:flex-row items-center md:justify-between">
                <div className="flex items-center space-x-4">
                    <img
                        src={vehicleIcon}
                        alt={String(ride.vehicleType)}
                        className="h-[5rem] w-auto object-contain"
                    />
                    <div>
                        <span className="text-xl font-semibold text-gray-800">
                            {ride.vehicleName} {ride.vehicleNumber}
                        </span>
                        <p className="mt-1 text-gray-500">{t(ride.vehicleType)}</p>
                    </div>
                </div>

                <span
                    className={`mt-2 md:mt-0 mb-2 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(ride.passengerStatus)}
                     bg-opacity-10`}
                >
                    {getStatusIcon(ride.passengerStatus)}
                    <span className="ml-2">{ride.passengerStatus}</span>
                </span>
            </div>

            <p className="text-center md:text-left mb-3">
                <span className="font-medium text-gray-800">{t("seatsAvailable")}: </span>
                {ride.seatsAvailable}
            </p>
            <hr className="mb-4 border-gray-300" />

            {/* Driver + Seats + Note */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center space-x-6 flex-1">
                    <img
                        src={String(ride.driverProfileImg)}
                        alt={String(ride.driverName)}
                        className="w-[4rem] h-[4rem] rounded-full border-2 border-indigo-500 object-cover"
                    />
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
                <div className="flex-shrink-0 mt-2 sm:mt-0">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(ride.driveStatus)}`}
                    >
                        {getStatusIcon(String(ride.driveStatus))} {ride.driveStatus}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-gray-700 space-y-2 mt-2">
                    {ride.specialNote && (
                        <p>
                            <span className="font-medium text-gray-800">{t("note")}</span>{" "}
                            {ride.specialNote}
                        </p>
                    )}
                </div>
                {(ride.driveStatus !== "cancelled" && ride.passengerStatus !== "rejected") && <div className="mb-2">
                    <CancelButton label={t("reject")} handleClick={confirmReject} />
                </div>}
            </div>
        </div>
    );
};

export default RideDetails;