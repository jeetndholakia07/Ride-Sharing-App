import Rating from "../../models/Rating.js";
import UserProfile from "../../models/UserProfile.js";
import getProfileImg from "../../crud/getProfileImg.js";

const getRatings = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const skip = (page - 1) * limit;
        const totalRatings = await Rating.countDocuments();
        const ratings = await Rating.find().populate("user", "username role")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const ratingsWithUserProfile = await Promise.all(
            ratings.map(async (rating) => {
                const profile = await UserProfile.findOne({ user: rating.user._id });
                const profileImg = await getProfileImg(profile.profileImg.publicId, profile.profileImg.format, profile.isProfileUpdated);
                return {
                    rating: rating.rating,
                    review: rating.review,
                    createdAt: rating.createdAt,
                    user: {
                        username: rating.user.username,
                        role: rating.user.role,
                        profileImg: profileImg
                    }
                }
            })
        );
        const totalPages = Math.ceil(totalRatings / limit);
        const response = {
            page,
            limit,
            totalItems: totalRatings,
            totalPages,
            data: ratingsWithUserProfile
        }
        res.status(200).json(response);
    }
    catch (err) {
        console.error("Error getting ratings:", err);
        res.status(501).send();
    }
}
export default getRatings;