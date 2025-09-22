import Ride from "../../models/Ride.js";
import Drive from "../../models/Drive.js";
import getDriverDetails from "../../crud/getDriverDetails.js";

const getRidesForRider = async (req, res) => {
    try {
        const { rideId, status } = req.body;
        if (!rideId) {
            return res.status(404).json({ message: "Please enter rider id." });
        }

        //Ride query
        let query = { passenger: rideId };
        // If status is provided, add case-insensitive regex filter
        if (status && status.trim() !== "") {
            query.driverStatus = { $regex: new RegExp(`^${status}$`, "i") };
        }

        // Get all the rides for the rider
        const rides = await Ride.find(query);

        // For each ride, fetch the associated drive and driver details
        const rideDetails = await Promise.all(
            rides.map(async (ride) => {
                // Find the associated drive 
                const drive = await Drive.findOne({ driver: ride.drive });
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
                        rideId: ride.passenger,
                        driveId: ride.drive,
                        passengerStatus: ride.passengerStatus,
                        requestedAt: ride.requestedAt,
                        completedAt: ride.completedAt,
                        acceptedAt: ride.acceptedAt,
                        rejectedAt: ride.rejectedAt
                    },
                    driveDetails: {
                        from: drive.from,
                        to: drive.to,
                        departureTime: drive.departureTime,
                        driverStatus: drive.driveStatus,
                        vehicleDetails: drive.vehicleDetails
                    },
                    driverDetails: driver
                };
            })
        );

        // Filter out any null results (in case no drive or driver was found)
        const filteredRideDetails = rideDetails.filter((ride) => ride !== null);

        res.status(200).json(filteredRideDetails);
    } catch (err) {
        console.error("Error getting rides for rider:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export default getRidesForRider;