type Driver = {
    _id: string;
    username: string;
    mobile: string;
};

type VehicleDetails = {
    vehicleType: string;
    vehicleName: string;
    vehicleNumber: string;
    fuelType: string;
    isAc: boolean;
};

type RideDetails = {
    _id: string;
    driverStatus: string;
    requestedAt: string;
    createdAt: string;
    drive: DriveDetails;
    seats: number;
    amountRequested: number;
    rideFrom: string;
    rideTo: string;
}

type DriveDetails = {
    _id: string;
    driver: Driver;
    vehicleDetails: VehicleDetails;
    departureTime: string;
    driveStatus: string;
    specialNote: string;
    driveFrom: string;
    driveTo: string;
    estimatedTimeMin: number;
};

type UserRating = {
    rating: number;
    review: string;
    driver: string;
}

type RidesForPassengerResponse = {
    ride: RideDetails;
    driverProfileImg: string;
    driverRating: number;
    userRating: UserRating;
};

export const ridesForPassengerMap = (data: RidesForPassengerResponse): Record<string, any> => {
    const ride = data.ride;
    const drive = ride.drive;
    const vehicle = drive.vehicleDetails;
    const driver = drive.driver;

    return {
        rideId: ride._id,
        driverStatus: ride.driverStatus,
        requestedAt: ride.requestedAt,

        from: drive.driveFrom,
        to: drive.driveTo,
        driveId: drive._id,
        driverId: driver._id,
        driverName: driver.username,
        driverMobile: driver.mobile,
        driverProfileImg: data.driverProfileImg,
        departureTime: drive.departureTime,
        driveStatus: drive.driveStatus,
        specialNote: drive.specialNote,

        vehicleType: vehicle.vehicleType,
        vehicleName: vehicle.vehicleName,
        vehicleNumber: vehicle.vehicleNumber,
        fuelType: vehicle.fuelType,
        isAc: vehicle.isAc,

        userSeats: ride.seats,
        seatsAvailable: ride.seats,
        pickup: ride.rideFrom,
        dropoff: ride.rideTo,
        amountRequested: ride.amountRequested,
        pricePerPerson: ride.amountRequested,
        driverRating: data.driverRating,
        userRating: data.userRating
    };
};
