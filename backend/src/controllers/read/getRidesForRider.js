import Ride from "../../models/Ride.js";
import Drive from "../../models/Drive.js";
import UserProfile from "../../models/UserProfile.js";
import getProfileImg from "../../crud/getProfileImg.js";

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
            .populate({
                path: "drive",
                populate: {
                    path: "driver",
                    select: "username mobile"
                }
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const rideDetails = await Promise.all(
            rides.map(async (ride) => {
                const drive = await Drive.findById(ride.drive);
                const driverProfile = await UserProfile.findOne({ user: drive.driver });
                const profileImg = await getProfileImg(driverProfile.profileImg.publicId, driverProfile.profileImg.format,
                    driverProfile.isProfileUpdated);
                return {
                    ride,
                    driverProfileImg: profileImg
                }
            })
        );

        const totalPages = Math.ceil(totalRides / limit);

        const response = {
            page,
            limit,
            totalItems: totalRides,
            totalPages,
            data: rideDetails
        };

        res.status(200).json(response);
    } catch (err) {
        console.error("Error getting rides for rider:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export default getRidesForRider;