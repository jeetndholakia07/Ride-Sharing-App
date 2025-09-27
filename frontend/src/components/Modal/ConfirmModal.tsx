import { Modal, Box } from "@mui/material";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type ConfirmModalProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    message: string;
    confirmBtn: string;
    handleSubmit: () => void;
    handleCancel?: () => void;
    bgColor?: string;
};

const ConfirmModal: FC<ConfirmModalProps> = ({ open, onClose, handleSubmit, title, message, confirmBtn,
    bgColor = "bg-green-600 hover:bg-green-700", handleCancel = onClose
}) => {
    const { t } = useTranslation();
    return (
        <Modal open={open} onClose={onClose}>
            <Box className="p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mt-40 relative outline-none">
                <button type="button" className="absolute px-4 py-2 rounded-lg hover:cursor-pointer hover:text-gray-700 top-10 right-5 focus:outline-none"
                    onClick={onClose}>
                    <i className="bi bi-x-lg text-sm" />
                </button>
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4 transition-all duration-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
                    <p className="text-gray-700 font-medium">{message}</p>

                    <div className="flex justify-end mt-6 gap-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 rounded-md border hover:cursor-pointer border-gray-400 text-gray-700 hover:bg-gray-100 transition"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                handleSubmit();
                                onClose();
                            }}
                            className={`px-4 py-2 rounded-md ${bgColor} hover:cursor-pointer text-white transition`}
                        >
                            {confirmBtn}
                        </button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default ConfirmModal;