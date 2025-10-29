export const getRideStatus = (ride: any) => {
    if (!ride) return null;
    if (ride.passengerStatus === "rejected") return ride.passengerStatus;
    if (ride.driveStatus === "completed") return ride.driveStatus;
    if (ride.passengerStatus !== "rejected") return ride.driverStatus;
    if (ride.driveStatus === "cancelled") return ride.driveStatus;
    return null;
}