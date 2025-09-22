import Ride from "../../models/Ride.js";

const createRide = async (req, res) => {
    try {
        const { driveId, userId } = req.body;
        if (!driveId || !userId) {
            return res.status(404).json({ message: "Please ride and user id" });
        }
        const newRide = await Ride.create({
            driver: driveId,
            passenger: userId
        });

        res.status(201).json(newRide);
    }
    catch (err) {
        console.error("Error creating new ride:", err);
        res.status(501).send();
    }
}
export default createRide;