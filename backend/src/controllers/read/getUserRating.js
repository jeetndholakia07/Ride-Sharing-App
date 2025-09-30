import Rating from "../../models/Rating.js";
import getProfileImg from "../../crud/getProfileImg.js";
import UserProfile from "../../models/UserProfile.js";

const getUserRating = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "User id not found" });
        }
        const rating = await Rating.findOne({ user: userId }).populate("user", "username role");
        if (!rating) {
            return res.status(404).json({ message: "No review found" });
        }
        const profile = await UserProfile.findOne({ user: userId });
        const profileImg = await getProfileImg(profile.profileImg.publicId, profile.profileImg.format, profile.isProfileUpdated);
        const response = {
            rating: rating.rating,
            review: rating.review,
            createdAt: rating.createdAt,
            user: {
                username: rating.user.username,
                role: rating.user.role,
                profileImg: profileImg
            }
        }
        res.status(200).json(response);
    }
    catch (err) {
        console.error("Error getting user rating:", err);
        res.status(501).send();
    }
}
export default getUserRating;