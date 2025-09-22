import Rating from "../../models/Rating.js";

const getRatings = async (req, res) => {
    try {
        const ratings = await Rating.find().populate("user", "username role");
        res.status(200).json(ratings);
    }
    catch (err) {
        console.error("Error getting ratings:", err);
        res.status(501).send();
    }
}
export default getRatings;