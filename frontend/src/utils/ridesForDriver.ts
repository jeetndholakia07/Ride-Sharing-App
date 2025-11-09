type Passenger = {
    _id: string;
    username: string;
    mobile: string;
    collegeName: string;
};

type PassengerRating = {
    rating: number;
    review: string;
}

type RideRequest = {
    passenger: Passenger;
    passengerProfileImg: string;
    requestedAt: string;
    driverStatus: string;
    seats: number;
    pickup: string;
    dropoff: string;
    amountRequested: number;
    passengerRating: PassengerRating;
};

type VehicleDetails = {
    vehicleType: string;
    vehicleName: string;
    vehicleNumber: string;
    fuelType: string;
    isAc: boolean;
};

type DriveDetails = {
    driveId: string;
    from: string;
    to: string;
    departureTime: string;
    vehicleDetails: VehicleDetails;
    seatsAvailable: number;
    driveStatus: string;
    specialNote: string;
    pricePerPerson: number;
};

type RidesForDriverResponse = {
    driveDetails: DriveDetails;
    rideRequests: RideRequest[];
};

export const ridesForDriverMap = (data: RidesForDriverResponse): Record<string, any> => {
    const drive = data.driveDetails;
    const vehicle = drive.vehicleDetails;

    const passengers = data.rideRequests.map((request) => ({
        passengerId: request.passenger._id,
        passengerName: request.passenger.username,
        passengerMobile: request.passenger.mobile,
        passengerCollegeName: request.passenger.collegeName,
        driverStatus: request.driverStatus,
        passengerProfileImg: request.passengerProfileImg,
        requestedAt: request.requestedAt,
        seats: request.seats,
        pickup: request.pickup,
        dropoff: request.dropoff,
        amountRequested: request.amountRequested,
        passengerRating: request.passengerRating
    }));

    return {
        driveId: drive.driveId,
        from: drive.from,
        to: drive.to,
        departureTime: drive.departureTime,
        vehicleType: vehicle.vehicleType,
        vehicleName: vehicle.vehicleName,
        vehicleNumber: vehicle.vehicleNumber,
        fuelType: vehicle.fuelType,
        isAc: vehicle.isAc,
        seatsAvailable: drive.seatsAvailable,
        driveStatus: drive.driveStatus,
        specialNote: drive.specialNote,
        pricePerPerson: drive.pricePerPerson,
        passengers,
    };
};