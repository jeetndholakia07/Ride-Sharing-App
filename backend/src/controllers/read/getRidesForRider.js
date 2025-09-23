import Ride from "../../models/Ride.js";
import Drive from "../../models/Drive.js";
import getDriverDetails from "../../crud/getDriverDetails.js";

const getRidesForRider = async (req, res) => {
    try {
        const { page = 1, limit = 5, passengerStatus, driverStatus } = req.query;
        const skip = (page - 1) * limit;
        const passengerId = req.user.id;

        if (!passengerId) {
            return res.status(400).json({ message: "Passenger id not found" });
        }

        //Ride query
        let query = { passenger: passengerId };
        // If status is provided, add case-insensitive regex filter
        if (passengerStatus && passengerStatus.trim() !== "") {
            query.passengerStatus = { $eq: passengerStatus };
        }
        if (driverStatus && driverStatus.trim() !== "") {
            query.driverStatus = { $eq: driverStatus };
        }

        // Total number of rides for pagination
        const totalRides = await Ride.countDocuments(query);

        // Get all the rides for the rider
        const rides = await Ride.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // For each ride, fetch the associated drive and driver details
        const rideDetails = await Promise.all(
            rides.map(async (ride) => {
                // Find the associated drive 
                const drive = await Drive.findById(ride.drive);
                if (!drive) {
                    return null;
                }

                // Find the driver details
                const driver = await getDriverDetails(drive.driver);
                if (!driver) {
                    return null;
                }

                return {
                    rideDetails: {
                        passengerId: ride.passenger,
                        driveId: ride.drive,
                        passengerStatus: ride.passengerStatus,
                        requestedAt: ride.requestedAt,
                        completedAt: ride.completedAt,
                        acceptedAt: ride.acceptedAt,
                        cancelledAt: ride.cancelledAt
                    },
                    driveDetails: {
                        from: drive.from,
                        to: drive.to,
                        seatsAvailable: drive.seatsAvailable,
                        departureTime: drive.departureTime,
                        driveStatus: drive.driveStatus,
                        vehicleDetails: drive.vehicleDetails
                    },
                    driverDetails: driver
                };
            })
        );

        // Filter out any null results (in case no drive or driver was found)
        const filteredRideDetails = rideDetails.filter((ride) => ride !== null);

        const totalPages = Math.ceil(totalRides / limit);

        const response = {
            page,
            limit,
            totalItems: totalRides,
            totalPages,
            data: filteredRideDetails
        };

        res.status(200).json(response);
    } catch (err) {
        console.error("Error getting rides for rider:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export default getRidesForRider;