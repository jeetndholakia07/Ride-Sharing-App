import Drive from "../../models/Drive.js";
import Ride from "../../models/Ride.js";

const getDrivesForDriver = async (req, res) => {
    try {
        const { driverId } = req.body;

        if (!driverId) {
            return res.status(404).json({ message: "Please enter driver Id" });
        }

        //Find all drives associated with the driver
        const drives = await Drive.find({ driver: driverId });

        if (drives.length === 0) {
            return res.status(404).json({ message: "No drives found for this driver" });
        }

        //For each drive, find the associated ride requests and populate the passenger details
        const rideRequests = await Ride.find({ drive: { $in: drives.map(drive => drive.driver) } })
            .populate("passenger", "username mobile collegeName");

        const response = drives.map(drive => {
            const requestsForThisDrive = rideRequests.filter(ride => ride.drive.toString() === drive.driver.toString());

            return {
                driveDetails: {
                    from: drive.from,
                    to: drive.to,
                    departureTime: drive.departureTime,
                    vehicleDetails: drive.vehicleDetails,
                    seatsAvailable: drive.vehicleDetails.seatsAvailable,
                    isAccepted: drive.isAccepted,
                    isComplete: drive.isComplete,
                },
                rideRequests: requestsForThisDrive.map(ride => ({
                    passenger: {
                        username: ride.passenger.username,
                        mobile: ride.passenger.mobile,
                        collegeName: ride.passenger.collegeName,
                    },
                    requestedAt: ride.requestedAt,
                    status: ride.status,
                })),
            };
        });

        res.status(200).json(response);
    } catch (err) {
        console.error("Error getting drives for driver:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export default getDrivesForDriver;