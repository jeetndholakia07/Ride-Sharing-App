import Rating from "../../models/Rating.js";

const createRating = async (req, res) => {
    try {
        const { userId, rating, review } = req.body;
        if (!userId || !rating || !review) {
            return res.status(404).json({ message: "Please provide userId, rating and review" });
        }
        await Rating.create({
            user: userId,
            rating: rating,
            review: review
        });
        res.status(201).send();
    }
    catch (err) {
        console.error("Error creating rating:", err);
        res.status(501).send();
    }
}
export default createRating;