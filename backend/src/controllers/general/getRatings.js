import Rating from "../../models/Rating.js";
import UserProfile from "../../models/UserProfile.js";
import getProfileImg from "../../crud/getProfileImg.js";

const getRatings = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const skip = (page - 1) * limit;
        const totalRatings = await Rating.countDocuments();

        //Check if the user is logged in
        const userId = req.user ? req.user.id : null;

        //Find the user's rating if it exists
        let userRating = null;
        if (userId) {
            userRating = await Rating.findOne({ user: userId });
        };

        let ratingsQuery = Rating.find().populate("user", "username role _id")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        if (userId) {
            ratingsQuery = ratingsQuery.where("user").ne(userId);
        }

        //Get the ratings
        const ratings = await ratingsQuery;

        const allRatings = await Promise.all(
            ratings.map(async (rating) => {
                const profile = await UserProfile.findOne({ user: rating.user._id });
                const profileImg = await getProfileImg(profile.profileImg.publicId, profile.profileImg.format, profile.profileImg.isUpdated);
                return {
                    rating: rating.rating,
                    review: rating.review,
                    updatedAt: rating.updatedAt,
                    user: {
                        userId: rating.user._id,
                        username: rating.user.username,
                        role: rating.user.role,
                        profileImg: profileImg
                    }
                }
            })
        );

        //If logged-in user, add it to the response
        if (userId && userRating) {
            const profile = await UserProfile.findOne({ user: userId });
            const profileImg = await getProfileImg(profile.profileImg.publicId, profile.profileImg.format, profile.profileImg.isUpdated);

            const rating = {
                rating: userRating.rating,
                review: userRating.review,
                updatedAt: userRating.updatedAt,
                user: {
                    userId: userId,
                    username: req.user.username,
                    role: req.user.role,
                    profileImg: profileImg
                }
            };

            //Add the user's rating to all ratings
            allRatings.unshift(rating);
        }

        const totalPages = Math.ceil(totalRatings / limit);
        const response = {
            page,
            limit,
            totalItems: totalRatings,
            totalPages,
            data: allRatings
        }
        res.status(200).json(response);
    }
    catch (err) {
        console.error("Error getting ratings:", err);
        res.status(500).send();
    }
}
export default getRatings;