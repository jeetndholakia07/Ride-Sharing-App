import React, { createContext, useContext, useState, useCallback, type ReactNode, } from "react";
import ConfirmModal from "../components/Modal/ConfirmModal";

interface ConfirmModalContextType {
    openModal: (
        title: string,
        message: string,
        confirmBtn: string,
        handleSubmit: () => void,
        handleCancel?: () => void,
        bgColor?: string
    ) => void;
    closeModal: () => void;
}

const ConfirmModalContext = createContext<ConfirmModalContextType | undefined>(undefined);

export const useConfirmModal = () => {
    const context = useContext(ConfirmModalContext);
    if (!context) {
        throw new Error("useConfirmModal must be used within a ConfirmModalProvider");
    }
    return context;
};

export const ConfirmModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [confirmBtn, setConfirmBtn] = useState("");
    const [handleSubmit, setHandleSubmit] = useState<() => void>(() => () => { });
    const [handleCancel, setHandleCancel] = useState<() => void>(() => () => { });
    const [bgColor, setBgColor] = useState("bg-green-600 hover:bg-green-700");

    const openModal = useCallback((
        title: string,
        message: string,
        confirmBtn: string,
        onSubmit: () => void,
        onCancel: () => void = () => setOpen(false),
        bg: string = "bg-green-600 hover:bg-green-700"
    ) => {
        setTitle(title);
        setMessage(message);
        setConfirmBtn(confirmBtn);
        setHandleSubmit(() => onSubmit);
        setHandleCancel(() => onCancel);
        setBgColor(bg);
        setOpen(true);
    }, []);

    const closeModal = () => setOpen(false);

    return (
        <ConfirmModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <ConfirmModal
                open={open}
                title={title}
                message={message}
                confirmBtn={confirmBtn}
                handleSubmit={() => {
                    handleSubmit();
                    closeModal();
                }}
                handleCancel={handleCancel}
                bgColor={bgColor}
                closeModal={closeModal}
            />
        </ConfirmModalContext.Provider>
    );
};  