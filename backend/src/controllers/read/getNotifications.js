import Notification from "../../models/Notification.js";

const getNotifications = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(404).json({ message: "Please enter userId" });
        }
        const userNotifications = await Notification.find({ user: userId }).populate("user");
        res.status(200).json(userNotifications);
    }
    catch (err) {
        console.error("Error getting user notifications:", err);
        res.status(501).send();
    }
}
export default getNotifications;