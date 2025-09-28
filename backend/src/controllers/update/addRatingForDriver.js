import User from "../../models/User.js";

const addRatingForDriver = async (req, res) => {
    try {
        const { driverId, rating } = req.body;
        if (!driverId || !rating) {
            return res.status(404).json({ message: "Please enter driver id and rating" });
        }
        const driver = await User.findById(driverId);
        driver.rating = rating;
        await driver.save();
        res.status(201).send();
    }
    catch (err) {
        console.error("Error adding rating for driver:", err);
        res.status(501).send();
    }
}
export default addRatingForDriver;