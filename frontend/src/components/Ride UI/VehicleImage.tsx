import type { FC } from "react";
import { getVehicleIcon } from "../../utils/rideFormat";

type vehicleProps = {
    vehicleType: string;
}

const VehicleImage: FC<vehicleProps> = ({ vehicleType }) => {
    const icon = getVehicleIcon(vehicleType);
    return (
        <img src={icon} alt={vehicleType} className="mt-2 h-[4rem] w-[4rem] object-cover flex-shrink-0" />
    )
}

export default VehicleImage;