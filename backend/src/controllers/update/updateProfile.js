import UserProfile from "../../models/UserProfile.js";

const updateProfile = async (req, res) => {
    try {
        const { userId, email, fullName } = req.body;
        if (!userId || !email || !fullName) {
            return res.status(404).json({ message: "Please provide all details" });
        }
        const userProfile = await UserProfile.findOne({ user: userId });
        if (!userProfile) {
            return res.status(404).json({ message: "User Profile doesn't exist" });
        }

        userProfile.email = email;
        userProfile.fullName = fullName;

        await userProfile.save();
        res.status(201).send();
    }
    catch (err) {
        console.error("Error updating profile details:", err);
        res.status(501).send();
    }
}
export default updateProfile;