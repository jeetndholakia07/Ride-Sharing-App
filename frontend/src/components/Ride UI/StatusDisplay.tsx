import type { FC } from "react";
import { getStatusIcon, getStatusColor } from "../../utils/rideFormat";

type props = {
    status: string;
}

const StatusDisplay: FC<props> = ({ status }) => {
    const statusColor = getStatusColor(status);
    return (
        <div className="flex-shrink-0 text-center md:text-right mt-2 sm:mt-0">
            <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor}`}
            >
                {getStatusIcon(status)}{status}
            </span>
        </div>
    )
}
export default StatusDisplay;