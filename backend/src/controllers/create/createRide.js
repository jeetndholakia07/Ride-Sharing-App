import Ride from "../../models/Ride.js";
import User from "../../models/User.js";
import Drive from "../../models/Drive.js";

const createRide = async (req, res) => {
    try {
        const { driveId, userId } = req.body;
        if (!driveId || !userId) {
            return res.status(404).json({ message: "Please ride and user id" });
        }

        //Check for role
        const user = await User.findById(userId);
        if (user.role !== "rider") {
            return res.status(401).json({ message: "Only rider role can request for rides" });
        }

        //Check for seats availability
        const drive = await Drive.findOne({ driver: driveId });
        if (drive.vehicleDetails.seatsAvailable === 0) {
            return res.status(400).json({ message: "No seats available" });
        }

        //Update drive status
        drive.vehicleDetails.seatsAvailable--;
        drive.isAccepted = true;

        //Create Ride Request
        const newRide = await Ride.create({
            drive: driveId,
            passenger: userId
        });

        await drive.save();

        res.status(201).json(newRide);
    }
    catch (err) {
        console.error("Error creating new ride:", err);
        res.status(501).send();
    }
}
export default createRide;