import UserProfile from "../../models/UserProfile.js";
import getProfileImg from "../../crud/getProfileImg.js";

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(404).json({ message: "Please enter userId" });
        }
        const userProfile = await UserProfile.findOne({ user: userId }).populate("user");
        let response = userProfile;
        const profileImg = await getProfileImg(userProfile.profileImg.publicId, userProfile.profileImg.format, userProfile.isProfileUpdated);
        if (userProfile.isProfileUpdated) {
            response = {
                ...userProfile,
                profileImg: profileImg
            };
        }
        res.status(200).json(response);
    }
    catch (err) {
        console.error("Error getting user profile:", err);
        return res.status(501).send();
    }
}
export default getUserProfile;