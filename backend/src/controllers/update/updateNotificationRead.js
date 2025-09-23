import Notification from "../../models/Notification.js";

const updateNotificationRead = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "User id not found" });
        }
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Notification id not found" });
        }
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        notification.isRead = true;
        await notification.save();
    }
    catch (err) {
        console.error("Error updating notification read:", err);
        res.status(501).send();
    }
}
export default updateNotificationRead;