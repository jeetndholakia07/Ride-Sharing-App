import Rating from "../../models/Rating.js";

const getUserRating = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "User id not found" });
        }
        const rating = await Rating.find({ user: userId });
        res.status(200).json(rating);
    }
    catch (err) {
        console.error("Error getting user rating:", err);
        res.status(501).send();
    }
}
export default getUserRating;