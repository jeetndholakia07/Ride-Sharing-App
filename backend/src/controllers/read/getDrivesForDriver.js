import Drive from "../../models/Drive.js";
import Ride from "../../models/Ride.js";
import getPassengerDetails from "../../crud/getPassengerDetails.js";

const getDrivesForDriver = async (req, res) => {
    try {
        const { driveId, status } = req.body;

        if (!driveId) {
            return res.status(400).json({ message: "Please enter driver Id" });
        }

        // Get all drives created by the driver
        const drives = await Drive.find({ driver: driveId });

        // For each drive, get the ride requests and passenger details
        const driveDetails = await Promise.all(
            drives.map(async (drive) => {
                //Ride query
                let query = { drive: drive.driver };
                // If status is provided, add case-insensitive regex filter
                if (status && status.trim() !== "") {
                    query.passengerStatus = { $regex: new RegExp(`^${status}$`, "i") };
                }
                // Get all rides that reference this drive
                const rides = await Ride.find(query);

                // For each ride, fetch passenger and profile manually
                const rideRequests = await Promise.all(
                    rides.map(async (ride) => {
                        const passenger = await getPassengerDetails(ride.passenger);
                        if (!passenger) return null;
                        return {
                            rideId: ride.passenger,
                            passenger,
                            requestedAt: ride.requestedAt,
                            passengerStatus: ride.passengerStatus
                        };
                    })
                );

                return {
                    driveDetails: {
                        driveId: drive.driver,
                        from: drive.from,
                        to: drive.to,
                        departureTime: drive.departureTime,
                        vehicleDetails: drive.vehicleDetails
                    },
                    rideRequests: rideRequests.filter(r => r !== null)
                };
            })
        );

        res.status(200).json(driveDetails);
    } catch (err) {
        console.error("Error getting drives for driver:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export default getDrivesForDriver;
