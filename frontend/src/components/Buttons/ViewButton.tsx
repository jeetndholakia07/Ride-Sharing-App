import React from "react";
import { useTranslation } from "react-i18next";

type ViewButtonProps = {
    handleClick: () => void;
};

const ViewButton: React.FC<ViewButtonProps> = ({ handleClick }) => {
    const { t } = useTranslation();
    return (
        <button
            onClick={handleClick}
            className="px-3 py-2 hover:cursor-pointer bg-blue-500 text-white rounded-md font-semibold text-sm hover:bg-blue-600 transition-colors focus:outline-none"
        >
            <i className="bi bi-eye-fill mr-1" /> {t("view")}
        </button>
    )
}

export default ViewButton;
