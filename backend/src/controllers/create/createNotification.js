import Notification from "../../models/Notification.js";

const createNotification = async (req, res) => {
    try {
        const { userId, heading, message } = req.body;
        if (!userId || !heading || !message) {
            return res.status(404).json({ message: "Please enter userId, heading and message" });
        }
        await Notification.create({
            user: userId,
            heading: heading,
            message: message
        });
        res.status(201).send();
    }
    catch (err) {
        console.error("Error creating notification:", err);
        res.status(501).send();
    }
}
export default createNotification;