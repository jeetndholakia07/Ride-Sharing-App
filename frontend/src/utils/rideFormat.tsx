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

const getStatusIcon = (status: string) => {
    switch (status) {
        case "accepted":
            return <i className="bi bi-check-lg text-green-700 mr-1" />;
        case "completed":
            return <i className="bi bi-check-lg text-green-700 mr-1" />;
        case "pending":
            return <i className="bi bi-hourglass-bottom text-yellow-700 mr-1" />;
        case "cancelled":
            return <i className="bi bi-x-lg text-red-700 mr-1" />;
        default:
            return <i className="bi bi-hourglass-bottom text-yellow-700 mr-1" />;
    }
}

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
}

export { getStatusColor, getStatusIcon, getVehicleIcon };