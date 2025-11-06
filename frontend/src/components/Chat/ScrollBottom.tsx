import type { FC } from "react";

type props = {
    onClick: any;
}

const ScrollBottom: FC<props> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute bottom-24 right-4 w-10 h-10 bg-[#25D366] hover:bg-[#20bd5c] text-white rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-105"
        >
            <i className="bi bi-arrow-down text-lg"></i>
        </button>
    )
}

export default ScrollBottom;