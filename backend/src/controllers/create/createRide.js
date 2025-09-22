import Ride from "../../models/Ride.js";
import User from "../../models/User.js";
import Drive from "../../models/Drive.js";
import createNotification from "../../crud/createNotification.js";

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

        //Update drive seats
        drive.vehicleDetails.seatsAvailable--;

        //Create Ride Request
        await Ride.create({
            drive: driveId,
            passenger: userId,
            passengerStatus: "accepted",
            rideDetails: {
                from: drive.vehicleDetails.from,
                to: drive.vehicleDetails.to
            }
        });

        await drive.save();

        //Notify driver
        await createNotification("rideRequested", driveId, {
            passengerName: user.username,
            from: drive.from,
            to: drive.to
        });

        res.status(201).json();
    }
    catch (err) {
        console.error("Error creating new ride:", err);
        res.status(501).send();
    }
}
export default createRide;