import React from "react";
import { Modal, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

interface RideDetails {
    from?: string;
    to?: string;
    distance?: number;
    duration?: number;
    price?: number;
}

interface ConfirmModalProps {
    open: boolean;
    title: string;
    message?: string;
    confirmBtn: string;
    handleSubmit: () => void;
    handleCancel: () => void;
    bgColor: string;
    closeModal: () => void;
    rideDetails?: RideDetails | null;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    open,
    title,
    message,
    confirmBtn,
    handleSubmit,
    handleCancel,
    bgColor,
    closeModal,
    rideDetails
}) => {
    const { t } = useTranslation();
    return (
        <Modal open={open} onClose={closeModal}>
            <Box
                className="fixed inset-0 flex items-center justify-center p-4 outline-none"
            >
                <Box className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg relative outline-none">
                    <button
                        type="button"
                        className="absolute top-5 hover:cursor-pointer right-5 text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"
                        onClick={closeModal}
                    >
                        <i className="bi bi-x-lg text-xl" />
                    </button>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">{title}</h2>

                    {rideDetails ? (
                        <div className="text-gray-800 font-medium leading-relaxed text-lg space-y-2">
                            <p><strong>Ride Confirmation</strong></p>
                            <p><strong>From:</strong> {rideDetails.from}</p>
                            <p><strong>To:</strong> {rideDetails.to}</p>
                            <p><strong>Distance:</strong> {rideDetails.distance} km</p>
                            <p><strong>Duration:</strong> {rideDetails.duration} min</p>
                            <p><strong>Price per person:</strong> {t("rs")}{rideDetails.price}</p>
                            <p className="mt-3">Do you want to request this ride?</p>
                        </div>
                    ) : (
                        <p className="text-gray-800 font-medium whitespace-pre-line leading-relaxed text-lg">
                            {message}
                        </p>
                    )}

                    <div className="flex justify-end mt-8 gap-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium
                            hover:cursor-pointer hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className={`px-5 py-2 rounded-lg font-medium text-white shadow-md transition 
                            hover:cursor-pointer transform hover:scale-105 ${bgColor}`}
                        >
                            {confirmBtn}
                        </button>
                    </div>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmModal;
