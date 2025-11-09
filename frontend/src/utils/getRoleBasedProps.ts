import { getRideStatus } from "./getRideStatus";

export const getRoleBasedProps = (role: string | undefined | null, ride: any) => {
    if (!role) {
        return {
            price: ride.pricePerPerson,
            status: ride.driveStatus,
            seats: ride.seatsAvailable,
            isDriver: false,
            isPassenger: false,
        };
    }

    return {
        price: role === "driver" ? ride.pricePerPerson : ride.pricePerPerson,
        status: role === "passenger" ? getRideStatus(ride) : ride.driveStatus,
        seats: role === "driver" ? ride.seatsAvailable : ride.seatsAvailable,
        isDriver: role === "driver",
        isPassenger: role === "passenger",
    };
};
