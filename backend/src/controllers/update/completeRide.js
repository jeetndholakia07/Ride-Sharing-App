import Ride from "../../models/Ride.js";
import User from "../../models/User.js";
import Drive from "../../models/Drive.js";
import createNotification from "../../crud/createNotification.js";

/* Complete ride by driver */
const completeRide = async (req, res) => {
    try {
        const { passengerId, driveId } = req.body;
        if (!passengerId || !driveId) {
            return res.status(404).json({ message: "Please enter driver id and passenger id." });
        }
        const ride = await Ride.findOne({ drive: driveId, passenger: passengerId });
        const drive = await Drive.findById(driveId);
        if (!ride || !drive) {
            return res.status(404).json({ message: "Drive or ride not found" });
        }
        //Save changes
        drive.driveStatus = "completed";
        drive.completedAt = new Date();
        await drive.save();

        const driver = await User.findById(drive.driver);
        //Notify passenger of completed ride
        await createNotification("rideCompleted", passengerId, {
            driverName: driver.username,
            from: drive.from,
            to: drive.to
        });

        res.status(200).send();
    }
    catch (err) {
        console.error("Error updating drive status:", err);
        res.status(501).send();
    }
}
export default completeRide;