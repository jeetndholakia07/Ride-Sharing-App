import Ride from "../../models/Ride.js";
import Drive from "../../models/Drive.js";
import UserProfile from "../../models/UserProfile.js";
import getProfileImg from "../../crud/getProfileImg.js";

const getRideById = async (req, res) => {
    try {
        const { rideId } = req.query;

        if (!rideId) {
            return res.status(404).json({ message: "Ride id not found" });
        }

        const ride = await Ride.findById(rideId).populate({
            path: "drive",
            populate: {
                path: "driver",
                select: "username mobile"
            }
        });

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        const drive = await Drive.findById(ride.drive);
        if (!drive) {
            return res.status(404).json({ message: "Associated drive not found" });
        }

        const driverProfile = await UserProfile.findOne({ user: drive.driver });
        const profileImg = await getProfileImg(driverProfile.profileImg.publicId, driverProfile.profileImg.format,
            driverProfile.isProfileUpdated);

        const response = {
            ride,
            driverProfileImg: profileImg
        };

        res.status(200).json(response);
    }
    catch (err) {
        console.error("Error getting ride by id:", err);
        res.status(500).json({ message: "Server error" });
    }
}

export default getRideById;