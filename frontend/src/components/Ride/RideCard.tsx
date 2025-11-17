import { type FC } from "react";
import { useNavigate } from "react-router";
import { getUserContext } from "../../context/UserContext";
import VehicleImage from "../Ride UI/VehicleImage";
import Location from "../Ride UI/Location";
import Departure from "../Ride UI/Departure";
import Seats from "../Ride UI/Seats";
import DriverImage from "../Ride UI/DriverImage";
import DriverName from "../Ride UI/DriverName";
import DriverRating from "../Ride UI/DriverRating";
import SpecialNote from "../Ride UI/SpecialNote";
import ViewButton from "../Buttons/ViewButton";
import PriceDisplay from "../Ride UI/PriceDisplay";
import StatusDisplay from "../Ride UI/StatusDisplay";
import useMediaQuery from "../../hooks/useMediaQuery";
import ACDisplay from "../Ride UI/ACDisplay";
import FuelTypeDisplay from "../Ride UI/FuelType";
import { getRoleBasedProps } from "../../utils/getRoleBasedProps";

type props = {
    data: any;
};

const RideCard: FC<props> = ({ data }) => {
    const ride = data;
    const navigate = useNavigate();
    const { getRole } = getUserContext();
    const isMedium = useMediaQuery("(min-width: 768px)");
    const role = getRole();
    const { price: ridePrice, status: rideStatus, seats: rideSeats, isDriver, isPassenger } = getRoleBasedProps(role, ride);

    const handleView = () => {
        const id = role === "passenger" ? ride.rideId : ride.driveId;
        navigate(`/profile/rides/${id}`, { state: { linkId: id } });
    };

    return (
        <div className="bg-white max-w-md rounded-xl shadow-lg overflow-hidden mx-auto">
            <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 flex flex-col items-center justify-center md:w-28 md:pl-4 md:pr-6 border-b md:border-b-0 md:border-r border-gray-200 py-4 md:py-0">
                    <VehicleImage vehicleType={ride.vehicleType} />
                    <div className="mt-3 flex flex-col items-center space-y-1">
                        <ACDisplay isAc={ride.isAc} />
                        <FuelTypeDisplay fuelType={ride.fuelType} />
                    </div>
                </div>

                <div className="flex-1 flex flex-col p-4 space-y-3">
                    <Location from={ride.from} to={ride.to} isPassenger={isPassenger} dropoff={ride.dropoff} />
                    <Departure departureTime={ride.departureTime} />

                    {isMedium && (
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
                            <PriceDisplay price={ridePrice} />
                            <StatusDisplay status={rideStatus} />
                        </div>
                    )}
                    {!isMedium && (<div className="flex flex-col space-y-1">
                        <div className="flex justify-between items-center mb-4">
                            <PriceDisplay price={ridePrice} />
                            <StatusDisplay status={rideStatus} />
                        </div>
                        <div className="flex justify-end">
                            <Seats seats={rideSeats} isLeft={isDriver} />
                        </div>
                    </div>
                    )}
                    {isMedium && <Seats seats={rideSeats} isLeft={isDriver} />}
                </div>
            </div>

            <div className="px-4 pt-4 border-t border-gray-200 flex flex-col">
                {isPassenger && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                        <DriverImage driverImage={ride.driverProfileImg} driverName={ride.driverName} />
                        <div className="flex-1 flex flex-col">
                            <DriverName driverName={ride.driverName} />
                            {ride.driverRating && <DriverRating driverRating={ride.driverRating} />}
                            <SpecialNote specialNote={ride.specialNote} />
                        </div>
                    </div>
                )}
                <div className="flex justify-end mb-4">
                    <ViewButton handleClick={handleView} />
                </div>
            </div>
        </div>
    );
};

export default RideCard;
