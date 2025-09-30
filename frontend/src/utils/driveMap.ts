type driveDetails = {
    vehicleDetails: {
        vehicleType: number,
        vehicleName: string,
        vehicleNumber: string
    },
    driveId: string,
    driver: {
        driverId: string,
        username: string,
        mobile: string
    },
    from: string,
    to: string,
    departureTime: string,
    seatsAvailable: number,
    driveStatus: string,
    specialNote: string,
    createdAt: string
}

export const vehicleMap = (data: driveDetails): Record<string, string | number> => ({
    vehicleType: data.vehicleDetails.vehicleType,
    vehicleName: data.vehicleDetails.vehicleName,
    vehicleNumber: data.vehicleDetails.vehicleNumber
});

export const driveMap = (data: driveDetails): Record<string, string | number> => ({
    driveId: data.driveId,
    from: data.from,
    to: data.to,
    departureTime: data.departureTime,
    seatsAvailable: data.seatsAvailable,
    specialNote: data.specialNote,
    driveStatus: data.driveStatus,
    createdAt: data.createdAt
});

export const driverMap = (data: driveDetails): Record<string, string> => ({
    driverId: data.driver.driverId,
    driverName: data.driver.username,
    mobile: data.driver.mobile,
});