import type { FC } from "react";
import { formatDateTime } from "../../utils/dateFormat";

type props = {
    departureTime: string;
}

const Departure: FC<props> = ({ departureTime }) => {
    return (
        <div className="mt-1 flex md:flex-nowrap flex-wrap items-center space-x-2 text-gray-500 text-sm">
            <i className="bi bi-clock-fill text-gray-700"></i>
            <span>{formatDateTime(departureTime)}</span>
        </div>
    )
}

export default Departure;