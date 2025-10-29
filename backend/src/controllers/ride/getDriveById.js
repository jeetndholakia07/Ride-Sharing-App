import Drive from "../../models/Drive.js";
import Ride from "../../models/Ride.js";
import getProfileImg from "../../crud/getProfileImg.js";
import UserProfile from "../../models/UserProfile.js";

const getDriveById = async (req, res) => {
    try {
        const { driveId } = req.query;

        if (!driveId) {
            return res.status(404).json({ message: "Drive id not found" });
        };

        const drive = await Drive.findById(driveId);

        if (!drive) {
            return res.status(404).json({ message: "Drive not found" });
        };

        const rides = await Ride.find({ drive: drive._id }).populate("passenger", "username mobile collegeName");

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
                    rejectedAt: ride.rejectedAt,
                    driverStatus: ride.driverStatus
                };
            })
        );

        const response = {
            driveDetails: {
                driveId: drive._id,
                from: drive.from,
                to: drive.to,
                departureTime: drive.departureTime,
                vehicleDetails: drive.vehicleDetails,
                seatsAvailable: drive.seatsAvailable,
                driveStatus: drive.driveStatus,
                specialNote: drive.specialNote,
                pricePerPerson: drive.pricePerPerson
            },
            rideRequests: rideRequests.filter(r => r !== null)
        };

        res.status(200).json(response);
    }
    catch (err) {
        console.error("Error getting drive by id:", err);
        res.status(500).json({ message: "Server error" });
    }
}

export default getDriveById;