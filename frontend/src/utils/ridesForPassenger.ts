type Driver = {
    _id: string;
    username: string;
    mobile: string;
};

type VehicleDetails = {
    vehicleType: string;
    vehicleName: string;
    vehicleNumber: string;
};

type RideDetails = {
    _id: string;
    rideName: string;
    passengerStatus: string;
    requestedAt: string;
    createdAt: string;
    updatedAt: string;
    drive: DriveDetails;
}

type DriveDetails = {
    _id: string;
    driver: Driver;
    vehicleDetails: VehicleDetails;
    from: string;
    to: string;
    departureTime: string;
    seatsAvailable: number;
    driveStatus: string;
    specialNote: string;
    createdAt: string;
    updatedAt: string;
};

type RidesForPassengerResponse = {
    ride: RideDetails;
    driverProfileImg: string;
};

export const ridesForPassengerMap = (data: RidesForPassengerResponse): Record<string, any> => {
    const ride = data.ride;
    const drive = ride.drive;
    const vehicle = drive.vehicleDetails;
    const driver = drive.driver;

    return {
        rideId: ride._id,
        rideName: ride.rideName,
        passengerStatus: ride.passengerStatus,
        requestedAt: ride.requestedAt,
        rideCreatedAt: ride.createdAt,
        rideUpdatedAt: ride.updatedAt,

        driveId: drive._id,
        driverId: driver._id,
        driverName: driver.username,
        driverMobile: driver.mobile,
        driverProfileImg: data.driverProfileImg,

        vehicleType: vehicle.vehicleType,
        vehicleName: vehicle.vehicleName,
        vehicleNumber: vehicle.vehicleNumber,

        from: drive.from,
        to: drive.to,
        departureTime: drive.departureTime,
        seatsAvailable: drive.seatsAvailable,
        driveStatus: drive.driveStatus,
        specialNote: drive.specialNote,
        driveCreatedAt: drive.createdAt,
        driveUpdatedAt: drive.updatedAt,
    };
};
