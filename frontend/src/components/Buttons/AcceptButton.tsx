import React from "react";

interface AcceptButtonProps {
    handleClick: () => void;
    disabled?: boolean;
    label: string;
}

const AcceptButton: React.FC<AcceptButtonProps> = ({ handleClick, disabled = false, label }) => {
    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium hover:cursor-pointer
        text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 shadow-sm
        ${disabled
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed shadow-none"
                    : "bg-green-500 hover:bg-green-600 active:bg-green-700 hover:shadow-md"
                }
      `}
        >
            <i className="bi bi-check-lg text-base"></i>
            <span>{label}</span>
        </button>
    );
};

export default AcceptButton;