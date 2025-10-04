import Ride from "../../models/Ride.js";
import User from "../../models/User.js";
import Drive from "../../models/Drive.js";
import createNotification from "../../crud/createNotification.js";

/* Complete ride by driver */
const completeRide = async (req, res) => {
    try {
        const { driveId } = req.body;
        if (!driveId) {
            return res.status(404).json({ message: "Please enter drive id and passenger id." });
        }
        const drive = await Drive.findById(driveId);
        if (!drive) {
            return res.status(404).json({ message: "Drive or ride not found" });
        }

        // Get all rides associated with the drive
        const rides = await Ride.find({ drive: driveId });
        if (rides.length === 0) {
            return res.status(404).json({ message: "No rides found for this drive." });
        }

        //Save changes
        drive.driveStatus = "completed";
        drive.completedAt = new Date();
        await drive.save();

        const driver = await User.findById(drive.driver);

        //Notify passengers of completed ride
        await Promise.all(
            rides.map((ride) =>
                ride.passengerStatus !== "rejected" && createNotification("rideCompleted", ride.passenger, {
                    driverName: driver.username,
                    from: drive.from,
                    to: drive.to,
                    linkId: ride._id
                }))
        );

        res.status(200).send();
    }
    catch (err) {
        console.error("Error updating drive status:", err);
        res.status(500).send();
    }
}
export default completeRide;