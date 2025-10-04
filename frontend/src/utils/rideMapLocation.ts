type rideDetails = {
    driveDetails: {
        drive: {
            _id: string;
            vehicleDetails: {
                vehicleType: string;
                vehicleName: string;
                vehicleNumber: string;
            };
            driver: {
                _id: string;
                username: string;
                mobile: string;
                rating?: number;
            };
            from: string;
            to: string;
            departureTime: string;
            seatsAvailable: number;
            driveStatus: string;
            specialNote: string;
            createdAt: string;
        };
        driverProfileImg: string;
    };
};

export const rideMap = (data: rideDetails): Record<string, string | number> => {
    const drive = data.driveDetails.drive;
    const driver = drive.driver;
    const vehicle = drive.vehicleDetails;

    return {
        vehicleType: vehicle.vehicleType,
        vehicleName: vehicle.vehicleName,
        vehicleNumber: vehicle.vehicleNumber,
        driveId: drive._id,
        from: drive.from,
        to: drive.to,
        departureTime: drive.departureTime,
        seatsAvailable: drive.seatsAvailable,
        specialNote: drive.specialNote,
        driveStatus: drive.driveStatus,
        driverId: driver._id,
        driverName: driver.username,
        mobile: driver.mobile,
        createdAt: drive.createdAt,
        driverProfileImg: data.driveDetails.driverProfileImg,
        driverRating: driver.rating ?? ""
    };
};
