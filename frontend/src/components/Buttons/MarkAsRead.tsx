import type { FC } from "react";

type props = {
    handleClick: any;
}

const MarkAsRead: FC<props> = ({ handleClick }) => {
    return (
        <button
            onClick={handleClick}
            className="text-sm hover:cursor-pointer text-blue-600 hover:underline mt-1 flex items-center gap-1"
        >
            <i className="bi bi-check2-square"></i> Mark as Read
        </button>
    )
}
export default MarkAsRead;