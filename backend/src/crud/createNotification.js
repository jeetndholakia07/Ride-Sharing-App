import Notification from "../models/Notification.js";
import { notificationTemplates } from "../utils/notificationTemplate.js";

const createNotification = async (type, userId, data) => {
    try {
        const { heading, message } = notificationTemplates[type](data);
        await Notification.create({
            user: userId,
            heading: heading,
            message: message
        });
    }
    catch (err) {
        console.error("Error creating notification:", err);
    }
}
export default createNotification;