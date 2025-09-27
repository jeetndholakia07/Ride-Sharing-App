import Notification from "../../models/Notification.js";

const getNotifications = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const skip = (page - 1) * limit;
        const userId = req.user.id;
        if (!userId) {
            return res.status(404).json({ message: "User id not found" });
        }
        const totalNotifications = await Notification.countDocuments({ user: userId });
        const userNotifications = await Notification.find({ user: userId })
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(totalNotifications / limit);

        const response = {
            page,
            limit,
            totalItems: totalNotifications,
            totalPages,
            data: userNotifications
        };

        res.status(200).json(response);
    }
    catch (err) {
        console.error("Error getting user notifications:", err);
        res.status(501).send();
    }
}
export default getNotifications;