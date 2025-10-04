import React from "react";

interface CancelButtonProps {
    handleClick: () => void;
    disabled?: boolean;
    label: string;
}

const CancelButton: React.FC<CancelButtonProps> = ({
    handleClick,
    disabled = false,
    label
}) => {
    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`px-3 py-2 rounded-full font-semibold transition-colors duration-300 border
                ${disabled
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-red-600 text-white border-red-700 hover:bg-red-700 active:bg-red-800 hover:cursor-pointer"
                }`}
        >
           <i className="bi bi-x-lg mr-1"/> {label}
        </button>
    );
};

export default CancelButton;