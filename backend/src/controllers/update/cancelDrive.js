import Ride from "../../models/Ride.js";
import User from "../../models/User.js";
import createNotification from "../../crud/createNotification.js";

const cancelDrive = async (req, res) => {
    try {
        const { rideId, driveId } = req.body;
        if (!rideId || !driveId) {
            return res.status(404).json({ message: "Please enter driver id and ride id." });
        }
        const drive = await Ride.findOne({ driver: driveId, passenger: rideId });
        const driver = await User.findById(driveId);
        if (!drive) {
            return res.status(404).json({ message: "Drive or ride not found" });
        }
        //Save changes
        drive.driverStatus = "cancelled";
        await drive.save();

        //Notify passenger of cancelled drive
        await createNotification("driveCancelled", rideId, {
            driverName: driver.username,
            from: drive.rideDetails.from,
            to: drive.rideDetails.to
        });

        res.status(200).send();
    }
    catch (err) {
        console.error("Error updating drive status:", err);
        res.status(501).send();
    }
}
export default cancelDrive;