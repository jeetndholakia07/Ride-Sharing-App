import type { Role } from "../context/UserContext";
import { getRideStatus } from "./getRideStatus";

export const getRoleBasedProps = (role: Role, ride: any) => {
    return {
        price: role === "driver" ? ride.pricePerPerson : ride.amountRequested,
        status: role === "passenger" ? getRideStatus(ride) : ride.driveStatus,
        seats: role === "driver" ? ride.seatsAvailable : ride.userSeats,
        isDriver: role === "driver",
        isPassenger: role === "passenger",
    };
};