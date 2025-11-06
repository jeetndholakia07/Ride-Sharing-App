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
    passengerStatus: string;
    driverStatus: string;
    seats: number;
    passengerRating: PassengerRating;
};

type VehicleDetails = {
    vehicleType: string;
    vehicleName: string;
    vehicleNumber: string;
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
        passengerStatus: request.passengerStatus,
        driverStatus: request.driverStatus,
        passengerProfileImg: request.passengerProfileImg,
        requestedAt: request.requestedAt,
        seats: request.seats,
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
        seatsAvailable: drive.seatsAvailable,
        driveStatus: drive.driveStatus,
        specialNote: drive.specialNote,
        pricePerPerson: drive.pricePerPerson,
        passengers,
    };
};