import Ride from "../../models/Ride.js";
import Drive from "../../models/Drive.js";
import User from "../../models/User.js";

const getRidesForRider = async (req, res) => {
    try {
        const { riderId } = req.body;
        if (!riderId) {
            return res.status(404).json({ message: "Please enter rider id." });
        }

        // Get all the rides for the rider
        const rides = await Ride.find({ passenger: riderId });

        // For each ride, fetch the associated drive and driver details
        const rideDetails = await Promise.all(
            rides.map(async (ride) => {
                // Find the associated drive 
                const drive = await Drive.findOne({ driver: ride.drive });
                if (!drive) {
                    return null;
                }

                // Find the driver details
                const driver = await User.findById(drive.driver);
                if (!driver) {
                    return null;
                }

                // Return the formatted ride, drive, and driver details
                return {
                    rideDetails: {
                        status: ride.status,
                        requestedAt: ride.requestedAt,
                        completedAt: ride.completedAt,
                    },
                    driveDetails: {
                        from: drive.from,
                        to: drive.to,
                        departureTime: drive.departureTime,
                        vehicleDetails: drive.vehicleDetails,
                        isAccepted: drive.isAccepted,
                        isComplete: drive.isComplete,
                    },
                    driverDetails: {
                        username: driver.username,
                        mobile: driver.mobile,
                    },
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