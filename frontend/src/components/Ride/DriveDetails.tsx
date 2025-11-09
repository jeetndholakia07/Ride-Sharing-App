import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../utils/dateFormat";
import { useToast } from "../Toast/ToastContext";
import AcceptButton from "../Buttons/AcceptButton";
import CancelButton from "../Buttons/CancelButton";
import NotFound from "../../pages/Error/NotFound";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { useConfirmModal } from "../../context/ConfirmModalContext";
import SpecialNote from "../Ride UI/SpecialNote";
import VehicleImage from "../Ride UI/VehicleImage";
import Seats from "../Ride UI/Seats";
import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "../Loading/PageLoader";
import { ridesForDriverMap } from "../../utils/ridesForDriver";
import PriceDisplay from "../Ride UI/PriceDisplay";
import StatusDisplay from "../Ride UI/StatusDisplay";
import ChatBtn from "../Buttons/ChatBtn";
import RatingDisplay from "../Review/RatingDisplay";

type driveProps = {
    linkId: any;
}

const DriveDetails: FC<driveProps> = ({ linkId }) => {
    const location = useLocation();
    const initialData = location.state?.data;  // Data passed via state
    const linkIdFromState = initialData?.driveId;  // Fallback ID from state
    const linkIdToUse = linkId || linkIdFromState; // Final ID to use (from state or URL)

    const hasInitialData = Boolean(initialData);  // Check if initialData is available
    const shouldFetch = !hasInitialData && Boolean(linkId);

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { showToast } = useToast();
    const { openModal } = useConfirmModal();

    const fetchDrive = async () => {
        try {
            const response = await apiInterceptor.get(api.ride.driveById, { params: { driveId: linkIdToUse } });
            return response.data;
        }
        catch (err) {
            console.error("Error fetching drive by id:", err);
            return null;
        }
    };

    const { data: ride, isLoading, isError, refetch } = useQuery({
        queryKey: ["ride", linkIdToUse],
        queryFn: fetchDrive,
        refetchOnWindowFocus: false,
        initialData: hasInitialData ? initialData : undefined,  // Use initialData if passed
        enabled: shouldFetch,  // Fetch only if shouldFetch is true
        retry: false,
        select: shouldFetch ? (data: any) => data && ridesForDriverMap(data) : undefined,
    });

    if (isLoading) return <PageLoader />;

    if (!ride || isError) return <NotFound />;

    const handleAcceptRide = async (payload: any) => {
        try {
            await apiInterceptor.put(api.ride.acceptRide, payload);
            showToast("success", t("messages.acceptRideSuccess"));
            refetch();
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
            await apiInterceptor.put(api.ride.cancelRide, { driveId: ride.driveId });
            showToast("success", t("messages.cancelRideSuccess"));
            refetch();
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
            await apiInterceptor.put(api.ride.completeRide, { driveId: ride.driveId });
            showToast("success", t("messages.completeRideSuccess"));
            refetch();
            navigate("/profile/rides");
        }
        catch (err) {
            console.error("Error completing ride:", err);
        }
    };

    const confirmReject = (passengerId: string) => {
        openModal(t("confirmReject"), t("messages.confirmRejectRide"), t("confirm"), () => handleRejectRide(passengerId));
    };

    const handleRejectRide = async (passengerId: string) => {
        try {
            await apiInterceptor.put(api.ride.rejectRide, { driveId: ride.driveId, passengerId: passengerId });
            showToast("success", t("messages.rejectRideSuccess"));
            navigate("/profile/rides");
            refetch();
        }
        catch (err) {
            console.error("Error rejecting ride:", err);
        }
    };

    const fetchUserChat = async (roomId: string) => {
        try {
            const response = await apiInterceptor.get(api.chat.userChat, { params: { roomId } });
            return response.data;
        } catch (err) {
            console.error("Error fetching user chat:", err);
            return null;
        }
    };

    const checkRoom = async (receiverId: string) => {
        try {
            const response = await apiInterceptor.get(api.chat.room, { params: { receiverId } });
            return response.data.roomId;
        } catch (err) {
            console.error("Error checking room:", err);
            return null;
        }
    };

    const handleJoinChat = async (receiverId: string) => {
        const roomId = await checkRoom(receiverId);
        if (!roomId) {
            showToast("error", t("error.server"));
            return;
        }
        const userChat = await fetchUserChat(roomId);
        navigate(`/profile/chats/${roomId}`, { state: { data: userChat } });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
            <button
                onClick={() => navigate(-1)}
                className="text-sm mb-4 md:mb-0 text-indigo-600 hover:underline hover:cursor-pointer"
            >
                {t("goback")}
            </button>

            <div className="text-center mb-6 mt-2">
                <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">
                    {ride.from} {t("arrow")} {ride.to}
                </h1>
                <p className="mt-2 text-gray-700 font-bold text-sm md:text-base">
                    <i className="bi bi-clock-fill mr-1" /> {t("departure")} {formatDateTime(ride.departureTime)}
                </p>
            </div>

            {/* Vehicle Info */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4 mb-2 md:mb-0">
                    <VehicleImage vehicleType={ride.vehicleType} />
                    <div>
                        <span className="text-xl font-semibold text-gray-800">
                            {ride.vehicleName} {ride.vehicleNumber}
                        </span>
                        <p className="mt-1 text-gray-500">{t(ride.vehicleType)}</p>
                    </div>
                </div>
                <div className="mb-2">
                    <StatusDisplay status={ride.driveStatus} />
                </div>
            </div>

            <div className="flex items-center">
                <div className="text-gray-700 space-y-2 mt-2">
                    {ride.specialNote && (
                        <SpecialNote specialNote={ride.specialNote} />
                    )}
                </div>
            </div>
            <div className="mb-2">
                <PriceDisplay price={ride.pricePerPerson} />
                <Seats seats={ride.seatsAvailable} isLeft={true} />
            </div>

            <hr className="border-gray-300" />

            {/* Passenger Requests Section */}
            <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{t("passengerRequests")}</h2>
                {ride.passengers.length > 0 ? (
                    <div className="space-y-4">
                        {ride.passengers.map((passenger: any, index: number) => (
                            <div
                                key={passenger.passengerId}
                                className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition border-l-4 border-blue-500"
                            >
                                {/* Header with number/icon */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-blue-500 font-bold">{index + 1}.</span>
                                    <i className="bi bi-person-fill text-gray-400" />
                                    <span className="font-semibold text-gray-700">{passenger.passengerName}</span>
                                    {(passenger.driverStatus === "accepted" || passenger.driverStatus === "rejected") && (
                                        <StatusDisplay status={passenger.driverStatus} />
                                    )}
                                </div>

                                {/* Passenger Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="flex gap-2">
                                        <span className="text-sm text-gray-500 font-medium">{t("mobile")}:</span>
                                        <span className="text-sm text-gray-700">{passenger.passengerMobile}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-sm text-gray-500 font-medium">{t("seats")}:</span>
                                        <span className="text-sm text-gray-700">{passenger.seats}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-sm text-gray-500 font-medium">{t("pickup")}:</span>
                                        <span className="text-sm text-gray-700">{passenger.pickup}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-sm text-gray-500 font-medium">{t("amount")}:</span>
                                        <span className="text-sm text-gray-700 font-semibold">{t("rs")} {passenger.amountRequested}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-sm text-gray-500 font-medium">{t("dropoff")}:</span>
                                        <span className="text-sm text-gray-700">{passenger.dropoff}</span>
                                    </div>

                                    {passenger?.passengerRating?.rating && (
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-500 font-medium">{t("rating")}:</span>
                                            <RatingDisplay
                                                rating={passenger.passengerRating.rating}
                                                review={passenger.passengerRating.review}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                                    {/* Chat button */}
                                    {passenger.driverStatus !== "rejected" && (<div className="flex justify-start sm:justify-start">
                                        <ChatBtn
                                            label={t("chat")}
                                            onClick={() => handleJoinChat(passenger.passengerId)}
                                        />
                                    </div>)}
                                    {/* Accept/Reject buttons */}
                                    <div className="flex gap-2 justify-start sm:justify-end">
                                        {(ride.driveStatus !== "cancelled" &&
                                            passenger.driverStatus !== "accepted") && (
                                                <AcceptButton
                                                    label={t("accept")}
                                                    handleClick={() =>
                                                        handleAcceptRide({
                                                            passengerId: passenger.passengerId,
                                                            driveId: ride.driveId,
                                                        })
                                                    }
                                                />
                                            )}
                                        {(ride.driveStatus !== "cancelled" &&
                                            passenger.driverStatus !== "rejected") && (
                                                <CancelButton
                                                    label={t("reject")}
                                                    handleClick={() => confirmReject(passenger.passengerId)}
                                                />
                                            )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">{t("noPassengerRequests")}</p>
                )}
            </div>
            <div className="flex items-center justify-end mt-4 gap-4">
                {(ride.driveStatus !== "cancelled" && ride.driveStatus !== "completed") &&
                    <CancelButton label={t("cancelRide")} handleClick={confirmCancelRide} />
                }
                {(ride.driveStatus !== "cancelled" && ride.driveStatus !== "completed") &&
                    <AcceptButton handleClick={confirmComplete} label={t("complete")} />}
            </div>
        </div>
    );
};

export default DriveDetails;