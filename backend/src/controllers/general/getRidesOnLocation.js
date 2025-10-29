import Drive from "../../models/Drive.js";
import getProfileImg from "../../crud/getProfileImg.js";
import UserProfile from "../../models/UserProfile.js";

const getRidesOnLocation = async (req, res) => {
    try {
        const { from, to, seats, date, page = 1, limit = 5 } = req.body;
        const skip = (page - 1) * limit;
        if (!from || !to || !seats || !date) {
            return res.status(404).json({ message: "Please enter from & to location and seats and date" });
        }

        //Map date with time
        const startofDay = new Date(date);
        startofDay.setHours(0, 0, 0, 0);
        const endofDay = new Date(date);
        endofDay.setHours(23, 59, 59, 999);

        const drives = await Drive.find({
            from: { $regex: from, $options: "i" },
            to: { $regex: to, $options: "i" },
            driveStatus: { $nin: ["completed", "cancelled"] },
            seatsAvailable: { $gte: seats },
            departureTime: {
                $gte: startofDay,
                $lte: endofDay
            }
        }).populate("driver", "username")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const driveDetails = await Promise.all(
            drives.map(async (drive) => {
                const userProfile = await UserProfile.findOne({ user: drive.driver });
                const profileImg = await getProfileImg(userProfile.profileImg.publicId, userProfile.profileImg.format, userProfile.isProfileUpdated);
                return {
                    driveDetails: {
                        drive,
                        driverProfileImg: profileImg
                    },
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
        res.status(500).send();
    }
}
export default getRidesOnLocation;