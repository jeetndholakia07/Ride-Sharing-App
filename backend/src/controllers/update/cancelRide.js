import Ride from "../../models/Ride.js";
import User from "../../models/User.js";
import Drive from "../../models/Drive.js";
import createNotification from "../../crud/createNotification.js";

/* Cancel ride by driver */
const cancelRide = async (req, res) => {
    try {
        const { passengerId, driveId } = req.body;
        if (!passengerId || !driveId) {
            return res.status(404).json({ message: "Please enter drive id and passenger id." });
        }
        const ride = await Ride.findOne({ drive: driveId, passenger: passengerId });
        const drive = await Drive.findById(driveId);
        if (!ride || !drive) {
            return res.status(404).json({ message: "Ride or drive not found" });
        }

        //Save changes
        drive.driveStatus = "cancelled";
        drive.cancelledAt = new Date();
        await drive.save();

        //Notify passenger of cancelled drive
        const driver = await User.findById(drive.driver);
        await createNotification("driveCancelled", passengerId, {
            driverName: driver.username,
            from: drive.from,
            to: drive.to
        });

        res.status(200).send();
    }
    catch (err) {
        console.error("Error updating ride status:", err);
        res.status(501).send();
    }
}
export default cancelRide;