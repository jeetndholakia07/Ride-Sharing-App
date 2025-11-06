import type { FC } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";

type ReverseBtnProps = {
    handleClick: () => void;
};

const ReverseBtn: FC<ReverseBtnProps> = ({ handleClick }) => {
    const matches = useMediaQuery("(max-width:768px)");

    return (
        <button
            type="button"
            onClick={handleClick}
            className="flex items-center justify-center h-full px-4 bg-gray-50 border border-gray-200 rounded-lg
        hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2
      focus:ring-blue-300 hover:cursor-pointer" aria-label='Reverse route'
        >
            {!matches ? (
                <i className="bi bi-arrow-left-right text-gray-600 text-lg sm:text-xl" />
            ) : (
                <i className="bi bi-arrow-down-up text-gray-600 text-lg sm:text-xl" />
            )}
        </button>
    );
};

export default ReverseBtn;
