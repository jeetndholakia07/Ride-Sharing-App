export const getRideStatus = (ride: any) => {
    if (!ride) return null;
    if (ride.driverStatus === "rejected") return ride.driverStatus;
    if (ride.driveStatus === "completed") return ride.driveStatus;
    if (ride.driveStatus === "cancelled") return ride.driveStatus;
    if (ride.driverStatus === "accepted") return ride.driverStatus;
    if (ride.driveStatus === "pending") return ride.driveStatus;
    return ride.driveStatus;
}