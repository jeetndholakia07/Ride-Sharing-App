import UserProfile from "../../models/UserProfile.js";
import User from "../../models/User.js";

const updateProfile = async (req, res) => {
    try {
        const { email, fullName, username, mobile, collegeName } = req.body;
        const userId = req.user.id;
        const role = req.user.role;
        if (!userId) {
            return res.status(400).json({ message: "User id not found" });
        }
        if (email == null || fullName == null) {
            return res.status(404).json({ message: "Email and full name can't be null" });
        }
        if (!username || !mobile) {
            return res.status(404).json({ message: "Username and mobile not found" });
        }
        if (role === "passenger") {
            if (!collegeName) {
                return res.status(404).json({ message: "College Name not found" });
            }
        }
        const user = await User.findById(userId);
        const userProfile = await UserProfile.findOne({ user: userId });
        if (!user || !userProfile) {
            return res.status(400).json({ message: "User or user profile not found" });
        }

        user.username = username
        user.mobile = mobile;
        if (role === "passenger") {
            user.collegeName = collegeName;
        }

        userProfile.email = email;
        userProfile.fullName = fullName;
        await user.save();
        await userProfile.save();
        res.status(201).send();
    }
    catch (err) {
        console.error("Error updating profile details:", err);
        res.status(501).send();
    }
}
export default updateProfile;