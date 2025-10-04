import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../utils/dateFormat";
import { getStatusColor, getStatusIcon, getVehicleIcon } from "../../utils/rideFormat";
import { useToast } from "../Toast/ToastContext";
import AcceptButton from "../Buttons/AcceptButton";
import CancelButton from "../Buttons/CancelButton";
import ProfileNotFound from "../Profile/ProfileNotFound";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { useConfirmModal } from "../../context/ConfirmModalContext";

const DriveDetails = () => {
    const location = useLocation();
    const data = location.state?.data;

    if (!data) {
        return <ProfileNotFound />;
    }

    const vehicleIcon = getVehicleIcon(data.vehicleType);
    const statusColor = getStatusColor(data.driveStatus);
    const statusIcon = getStatusIcon(data.driveStatus);

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { showToast } = useToast();
    const { openModal } = useConfirmModal();

    const handleAcceptRide = async (payload: any) => {
        try {
            await apiInterceptor.put(api.ride.acceptRide, payload);
            showToast("success", t("messages.acceptRideSuccess"));
            navigate("/profile/rides");
        }
        catch (err) {
            console.error("Error accepting ride:", err);
        }
    };

    const confirmCancelRide = () => {
        openModal(t("confirmCancel"), t("messages.confirmCancelRide"), t("confirm"), handleCancelRide);
    }

    const handleCancelRide = async () => {
        try {
            await apiInterceptor.put(api.ride.cancelRide, { driveId: data.driveId });
            showToast("success", t("messages.cancelRideSuccess"));
            navigate("/profile/rides");
        }
        catch (err) {
            console.error("Error cancelling ride:", err);
        }
    };

    const confirmComplete = () => {
        openModal(t("confirmComplete"), t("messages.confirmCompleteRide"), t("confirm"), handleCompleteRide);
    }

    const handleCompleteRide = async () => {
        try {
            await apiInterceptor.put(api.ride.completeRide, { driveId: data.driveId });
            showToast("success", t("messages.conpleteRideSuccess"));
            navigate("/profile/rides");
        }
        catch (err) {
            console.error("Error completing ride:", err);
        }
    };

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
                    {data.from} {t("arrow")} {data.to}
                </h1>
                <p className="mt-2 text-gray-700 font-bold text-sm md:text-base">
                    <i className="bi bi-clock-fill mr-1" /> {t("departure")} {formatDateTime(data.departureTime)}
                </p>
            </div>

            {/* Vehicle Info + Status */}
            <div className="flex flex-col md:flex-row items-center md:justify-between">
                <div className="flex items-center space-x-4">
                    <img
                        src={vehicleIcon}
                        alt={data.vehicleType}
                        className="h-[5rem] w-auto object-contain"
                    />
                    <div>
                        <span className="text-xl font-semibold text-gray-800">
                            {data.vehicleName} {data.vehicleNumber}
                        </span>
                        <p className="mt-1 text-gray-500">{t(data.vehicleType)}</p>
                    </div>
                </div>

                <span
                    className={`mt-2 md:mt-0 mb-2 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${statusColor} bg-opacity-10`}
                >
                    {statusIcon}
                    <span className="ml-2">{data.driveStatus}</span>
                </span>
            </div>


            <p className="text-center md:text-left mb-3">
                <span className="font-medium text-gray-800">{t("seatsAvailable")}:</span>{" "}
                {data.seatsAvailable}
            </p>

            <div className="flex items-center justify-between">
                {/* Special Note */}
                <div className="text-gray-700 space-y-2 mt-2 mb-4">
                    {data.specialNote && (
                        <p>
                            <span className="font-medium text-gray-800">{t("note")}</span>{" "}
                            {data.specialNote}
                        </p>
                    )}
                </div>
            </div>

            <hr className="border-gray-300" />
            {/* Passenger Requests Section */}
            <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{t("passengerRequests")}</h2>

                {data.passengers.length > 0 ? (
                    <div className="space-y-4">
                        {data.passengers.map((passenger: any) => (
                            <div
                                key={passenger.passengerId}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={passenger.passengerProfileImg}
                                        alt={passenger.passengerName}
                                        className="w-[4rem] h-[4rem] rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold text-gray-700">Name: {passenger.passengerName}</p>
                                        <p className="text-sm text-gray-500">College Name: {passenger.passengerCollegeName}</p>
                                        <p className="text-sm text-gray-500">Mobile: {passenger.passengerMobile}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(passenger.passengerStatus)}}`}
                                    >
                                        {getStatusIcon(passenger.passengerStatus)}
                                        {passenger.passengerStatus}
                                    </span>
                                    <p className="text-sm text-gray-500">{formatDateTime(passenger.requestedAt)}</p>
                                </div>
                                {(data.driveStatus !== "cancelled" && data.driveStatus !== "pending" && passenger.passengerStatus !== "rejected") && (
                                    <AcceptButton label={t("accept")}
                                        handleClick={() => handleAcceptRide({ passengerId: passenger.passengerId, driveId: data.driveId })}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">{t("noPassengerRequests")}</p>
                )}
            </div>
            <div className="flex items-center justify-end mt-4 gap-4">
                {data.driveStatus !== "cancelled" &&
                    <CancelButton label={t("cancel")} handleClick={confirmCancelRide} />
                }
                {data.driveStatus !== "cancelled" && <AcceptButton handleClick={confirmComplete}
                    label={t("complete")} />}
            </div>
        </div>
    );
};

export default DriveDetails;