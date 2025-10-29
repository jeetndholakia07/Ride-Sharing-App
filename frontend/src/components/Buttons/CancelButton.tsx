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
            className={`
        inline-flex items-center justify-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium
        transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-1
        shadow-sm hover:cursor-pointer
        ${disabled
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed shadow-none"
                    : "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 hover:shadow-md"
                }
      `}
        >
            <i className="bi bi-x-lg text-base"></i>
            <span>{label}</span>
        </button>
    );
};

export default CancelButton;