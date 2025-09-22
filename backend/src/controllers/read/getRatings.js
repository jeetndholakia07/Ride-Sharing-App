import Rating from "../../models/Rating.js";
import UserProfile from "../../models/UserProfile.js";
import getProfileImg from "../../crud/getProfileImg.js";

const getRatings = async (req, res) => {
    try {
        //Get all ratings
        const ratings = await Rating.find().populate("user", "username role");
        const ratingsWithUserProfile = await Promise.all(
            ratings.map(async (rating) => {
                const profile = await UserProfile.findOne({ user: rating.user._id });
                const profileImg = await getProfileImg(profile.profileImg.publicId, profile.profileImg.format, profile.isProfileUpdated);
                return {
                    rating: rating.rating,
                    review: rating.review,
                    user: {
                        username: rating.user.username,
                        role: rating.user.role,
                        profileImg: profileImg
                    }
                }
            })
        );
        res.status(200).json(ratingsWithUserProfile);
    }
    catch (err) {
        console.error("Error getting ratings:", err);
        res.status(501).send();
    }
}
export default getRatings;