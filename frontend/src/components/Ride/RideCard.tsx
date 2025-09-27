import { useState, type FC } from "react";
import carIcon from "/assets/vehicle/car-icon.png";
import bikeIcon from "/assets/vehicle/bike-icon.png";
import scooterIcon from "/assets/vehicle/scooter-icon.png";

const getVehicleIcon = (vehicleType: string) => {
    switch (vehicleType?.toLowerCase()) {
        case "four-wheeler":
            return carIcon;
        case "two-wheeler":
            return scooterIcon;
        case "bike":
            return bikeIcon;
        default:
            return carIcon;
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "accepted":
            return "bg-green-100 text-green-800";
        case "cancelled":
            return "bg-red-100 text-red-800";
        case "pending":
            return "bg-yellow-100 text-yellow-800";
        default:
            return "bg-yellow-100 text-yellow-800";
    }
};

type props = {
    ride: any;
}

const RideCard: FC<props> = ({ ride }) => {
    const [expanded, setExpanded] = useState(false);
    const icon = getVehicleIcon(ride.vehicleType);
    const statusColor = getStatusColor(ride.status);


    return (
        <div className="bg-white max-w-sm rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 flex items-center space-x-4">
                {/* Vehicle Icon */}
                <img src={icon} alt={ride.vehicleType} className="h-10 w-10" />

                <div className="flex-1">
                    {/* From → To */}
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-800">{ride.from}</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-lg font-bold text-gray-800">{ride.to}</span>
                    </div>

                    {/* Departure time */}
                    <div className="mt-1 flex items-center space-x-2 text-gray-500 text-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{new Date(ride.departureTime).toLocaleString()}</span>
                    </div>
                </div>

                {/* Status Badge */}
                <div>
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor}`}
                    >
                        {status.charAt(0).toUpperCase() + ride.status.slice(1)}
                    </span>
                </div>
            </div>

            <div className="px-4 pb-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    {/* Driver avatar + name + rating */}
                    <div className="flex items-center space-x-3">
                        <img
                            src={ride.driver.profileImage || "https://via.placeholder.com/48"}
                            alt={ride.driver.name}
                            className="h-12 w-12 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                            <p className="text-gray-800 font-semibold">{ride.driver.name}</p>
                            <p className="text-gray-500 text-sm">⭐ {ride.driver.rating?.toFixed(1) || "–"}</p>
                        </div>
                    </div>

                    {/* Price & seats info */}
                    <div className="text-right">
                        <p className="text-gray-800 font-bold text-lg">₹ {ride.price}</p>
                        <p className="text-gray-500 text-sm">{ride.seatsAvailable} seat{ride.seatsAvailable > 1 ? "s" : ""} left</p>
                    </div>
                </div>

                {/* Read More / Toggle details */}
                <div className="mt-4 text-right">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
                    >
                        {expanded ? "Show Less" : "Read More"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RideCard;