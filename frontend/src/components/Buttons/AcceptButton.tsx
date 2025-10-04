import React from "react";

interface AcceptButtonProps {
    handleClick: any;
    disabled?: boolean;
    label:string;
}

const AcceptButton: React.FC<AcceptButtonProps> = ({ handleClick, disabled = false, label }) => {
    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`px-3 py-2 rounded-full font-semibold text-white transition-colors duration-300 
            ${disabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 hover:cursor-pointer active:bg-green-800"
                }`}
        >
            <i className="bi bi-check-lg text-white mr-1"/> {label}
        </button>
    );
};

export default AcceptButton;