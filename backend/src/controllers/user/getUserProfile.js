import UserProfile from "../../models/UserProfile.js";
import getProfileImg from "../../crud/getProfileImg.js";
import User from "../../models/User.js";
import getCollegeID from "../../crud/getCollegeID.js";

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        if (!userId) {
            return res.status(404).json({ message: "User id not found" });
        }
        const userProfile = await UserProfile.findOne({ user: userId }).populate("user");
        const user = await User.findById(userId);
        if (!user || !userProfile) {
            return res.status(400).json({ message: "User or user profile not found" });
        }
        const userData = {
            username: user.username,
            mobile: user.mobile,
            role: user.role,
            ...(role === "passenger" && { collegeName: user.collegeName }),
            ...(role === "passenger" && { collegeIDProof: await getCollegeID(user.collegeIDProof.publicId, user.collegeIDProof.format) })
        };
        let response = { fullName: userProfile.fullName, email: userProfile.email, ...userData, profileImg: userProfile.profileImg.publicId };
        if (userProfile.isProfileUpdated) {
            const profileImg = await getProfileImg(userProfile.profileImg.publicId, userProfile.profileImg.format, userProfile.isProfileUpdated);
            response = {
                ...response,
                profileImg: profileImg
            };
        }
        res.status(200).json(response);
    }
    catch (err) {
        console.error("Error getting user profile:", err);
        return res.status(500).send();
    }
}
export default getUserProfile;