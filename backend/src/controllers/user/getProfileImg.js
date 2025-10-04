import getProfileImg from "../../crud/getProfileImg.js";
import UserProfile from "../../models/UserProfile.js";

const getProfileImage = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "User id not found" });
        }
        const user = await UserProfile.findOne({ user: userId });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const profileImg = await getProfileImg(user.profileImg.publicId, user.profileImg.format, user.isProfileUpdated);
        res.status(200).json(profileImg);
    }
    catch (err) {
        console.error("Error fetching profile image:", err);
        res.status(500).send();
    }
}
export default getProfileImage;