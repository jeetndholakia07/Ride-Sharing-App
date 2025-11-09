type rideDetails = {
    driveDetails: {
        drive: {
            _id: string;
            vehicleDetails: {
                vehicleType: string;
                vehicleName: string;
                vehicleNumber: string;
                fuelType: string;
                isAc: boolean;
            };
            driver: {
                _id: string;
                username: string;
            };
            from: string;
            to: string;
            departureTime: string;
            seatsAvailable: number;
            driveStatus: string;
            specialNote: string;
            pricePerPerson: string;
            createdAt: string;
        };
        driverProfileImg: string;
        driverRating: number;
    };
};

export const rideMap = (data: rideDetails): Record<string, any> => {
    const drive = data.driveDetails.drive;
    const driver = drive.driver;
    const vehicle = drive.vehicleDetails;

    return {
        vehicleType: vehicle.vehicleType,
        vehicleName: vehicle.vehicleName,
        vehicleNumber: vehicle.vehicleNumber,
        fuelType: vehicle.fuelType,
        isAc: vehicle.isAc,
        driveId: drive._id,
        from: drive.from,
        to: drive.to,
        departureTime: drive.departureTime,
        seatsAvailable: drive.seatsAvailable,
        specialNote: drive.specialNote,
        driveStatus: drive.driveStatus,
        driverId: driver._id,
        driverName: driver.username,
        createdAt: drive.createdAt,
        driverProfileImg: data.driveDetails.driverProfileImg,
        driverRating: data.driveDetails.driverRating,
        pricePerPerson: drive.pricePerPerson
    };
};
