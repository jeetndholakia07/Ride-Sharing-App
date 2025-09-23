import UserProfile from "../../models/UserProfile.js";
import getProfileImg from "../../crud/getProfileImg.js";

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(404).json({ message: "User id not found" });
        }
        const userProfile = await UserProfile.findOne({ user: userId }).populate("user");
        let response = { ...userProfile, profileImg: userProfile.profileImg.publicId };
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
        return res.status(501).send();
    }
}
export default getUserProfile;