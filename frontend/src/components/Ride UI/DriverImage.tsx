import type { FC } from "react";

type props = {
    driverImage: string;
    driverName: string;
}

const DriverImage: FC<props> = ({ driverImage, driverName }) => {
    return (
        <img
            src={driverImage}
            alt={driverName}
            className="mt-3 h-[4rem] w-[4rem] rounded-full object-cover flex-shrink-0"
        />
    )
}

export default DriverImage;