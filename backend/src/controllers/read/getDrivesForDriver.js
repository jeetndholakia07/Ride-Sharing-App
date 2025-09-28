import Drive from "../../models/Drive.js";
import Ride from "../../models/Ride.js";
import getProfileImg from "../../crud/getProfileImg.js";
import UserProfile from "../../models/UserProfile.js";

const getDrivesForDriver = async (req, res) => {
    try {
        const { page = 1, limit = 5, passengerStatus, driverStatus } = req.query;
        const skip = (page - 1) * limit;
        const driverId = req.user.id;

        if (!driverId) {
            return res.status(400).json({ message: "Driver id not found" });
        }

        // Total number of drives for pagination
        const totalDrives = await Drive.countDocuments({ driver: driverId });

        // Get all drives created by the driver
        const drives = await Drive.find({ driver: driverId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // For each drive, get the ride requests and passenger details
        const driveDetails = await Promise.all(
            drives.map(async (drive) => {
                //Ride query
                let query = { drive: drive._id };
                // If status is provided, add case-insensitive regex filter
                if (passengerStatus && passengerStatus.trim() !== "") {
                    query.passengerStatus = { $eq: passengerStatus };
                }
                if (driverStatus && driverStatus.trim() !== "") {
                    query.driverStatus = { $eq: driverStatus };
                }

                // Get all rides that reference this drive
                const rides = await Ride.find(query).populate("passenger", "username mobile collegeName");

                // For each ride, fetch passenger and profile manually
                const rideRequests = await Promise.all(
                    rides.map(async (ride) => {
                        const passengerProfile = await UserProfile.findOne({ user: ride.passenger });
                        const profileImg = await getProfileImg(passengerProfile.profileImg.publicId, passengerProfile.profileImg.format,
                            passengerProfile.isProfileUpdated);
                        return {
                            passenger: ride.passenger,
                            passengerProfileImg: profileImg,
                            requestedAt: ride.requestedAt,
                            passengerStatus: ride.passengerStatus,
                            rejectedAt: ride.rejectedAt
                        };
                    })
                );

                return {
                    driveDetails: {
                        driveId: drive._id,
                        from: drive.from,
                        to: drive.to,
                        departureTime: drive.departureTime,
                        vehicleDetails: drive.vehicleDetails,
                        seatsAvailable: drive.seatsAvailable,
                        driveStatus: drive.driveStatus,
                        specialNote: drive.specialNote
                    },
                    rideRequests: rideRequests.filter(r => r !== null)
                };
            })
        );

        const totalPages = Math.ceil(totalDrives / limit);

        const response = {
            page,
            limit,
            totalItems: totalDrives,
            totalPages,
            data: driveDetails
        };

        res.status(200).json(response);
    } catch (err) {
        console.error("Error getting drives for driver:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export default getDrivesForDriver;