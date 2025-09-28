import Drive from "../../models/Drive.js";
import getProfileImg from "../../crud/getProfileImg.js";
import UserProfile from "../../models/UserProfile.js";

const getRidesOnLocation = async (req, res) => {
    try {
        const { from, to, seats, page = 1, limit = 5 } = req.body;
        const skip = (page - 1) * limit;
        if (!from || !to || !seats) {
            return res.status(404).json({ message: "Please enter from and to location and seats" });
        }
        const drives = await Drive.find({
            from: { $regex: from, $options: "i" },
            to: { $regex: to, $options: "i" },
            driveStatus: { $nin: ["completed", "cancelled"] },
            seatsAvailable: { $gte: seats }
        }).populate("driver", "username mobile")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const driveDetails = await Promise.all(
            drives.map(async (drive) => {
                const userProfile = await UserProfile.findOne({ user: drive.driver });
                const profileImg = await getProfileImg(userProfile.profileImg.publicId, userProfile.profileImg.format, userProfile.isProfileUpdated);
                return {
                    driveDetails: drive,
                    driverProfileImg: profileImg
                }
            })
        );

        const totalDrives = await Drive.countDocuments({
            from: { $regex: from, $options: "i" },
            to: { $regex: to, $options: "i" },
            driveStatus: { $nin: ["completed", "cancelled"] },
            seatsAvailable: { $gte: seats }
        });

        const totalPages = Math.ceil(totalDrives / limit);

        const response = {
            page,
            limit,
            totalItems: totalDrives,
            totalPages,
            data: driveDetails
        };

        res.status(200).json(response);
    }
    catch (err) {
        console.error("Error getting rides based on location:", err);
        res.status(501).send();
    }
}
export default getRidesOnLocation;