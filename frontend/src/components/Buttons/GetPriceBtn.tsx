import { type FC } from "react";

type props = {
    onClick: any
    disabled?: boolean;
    isLoading?: boolean;
    label?: string;
};

const GetPriceBtn: FC<props> = ({
    onClick,
    disabled = false,
    isLoading = false,
    label = "Get Price",
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition 
        ${disabled || isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 active:scale-95 hover:cursor-pointer"
                }`}
        >
            {isLoading ? (
                <>
                    <i className="bi bi-hourglass-split animate-spin"></i>
                    Getting Price...
                </>
            ) : (
                <>
                    <i className="bi bi-cash-coin"></i>
                    {label}
                </>
            )}
        </button>
    );
};

export default GetPriceBtn;