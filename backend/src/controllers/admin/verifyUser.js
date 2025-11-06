import User from "../../models/User.js";

const verifyUser = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User id is required" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        user.isVerified = true;
        await user.save();
        res.status(200).send();
    } catch (err) {
        console.error("Error verifying user:", err);
        res.status(500).json({ message: "Server error" });
    }
}
export default verifyUser;