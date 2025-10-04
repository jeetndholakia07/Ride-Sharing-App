type Passenger = {
    _id: string;
    username: string;
    mobile: string;
    collegeName: string;
};

type RideRequest = {
    passenger: Passenger;
    passengerProfileImg: string;
    requestedAt: string;
    passengerStatus: string;
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
        passengerProfileImg: request.passengerProfileImg,
        requestedAt: request.requestedAt,
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
        passengers,  // An array of simplified passenger objects
    };
};