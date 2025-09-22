import UserProfile from "../../models/UserProfile.js";

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(404).json({ message: "Please enter userId" });
        }
        const userProfile = await UserProfile.findOne({ user: userId }).populate("user");
        res.status(200).json(userProfile);
    }
    catch (err) {
        console.error("Error getting user profile:", err);
        return res.status(501).send();
    }
}
export default getUserProfile;