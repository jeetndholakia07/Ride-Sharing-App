import type { FC } from "react";

type props = {
    driverRating: number;
}

const DriverRating: FC<props> = ({ driverRating }) => {
    return (
        <p className="text-gray-500 text-sm flex items-center mb-1">
            <i className="bi bi-star-fill text-yellow-500 text-sm mr-1"></i> {driverRating?.toFixed(1)}
        </p>
    )
}
export default DriverRating;