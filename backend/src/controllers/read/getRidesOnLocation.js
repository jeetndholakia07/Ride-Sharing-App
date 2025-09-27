import Drive from "../../models/Drive.js";

const getRidesOnLocation = async (req, res) => {
    try {
        const { from, to, page = 1, limit = 5 } = req.body;
        const skip = (page - 1) * limit;
        if (!from || !to) {
            return res.status(404).json({ message: "Please enter from and to location" });
        }
        const drives = await Drive.find({
            from: { $regex: from, $options: "i" },
            to: { $regex: to, $options: "i" },
            driveStatus: { $nin: ["completed", "cancelled"] }
        }).populate("driver", "username mobile")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalDrives = await Drive.countDocuments({
            from: { $regex: from, $options: "i" },
            to: { $regex: to, $options: "i" },
            driveStatus: { $nin: ["completed", "cancelled"] }
        });

        const totalPages = Math.ceil(totalDrives / limit);

        const response = {
            page,
            limit,
            totalItems: totalDrives,
            totalPages,
            data: drives
        };

        res.status(200).json(response);
    }
    catch (err) {
        console.error("Error getting rides based on location:", err);
        res.status(501).send();
    }
}
export default getRidesOnLocation;