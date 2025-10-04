import Ride from "../../models/Ride.js";
import User from "../../models/User.js";
import Drive from "../../models/Drive.js";
import createNotification from "../../crud/createNotification.js";

/* Reject ride request by passenger */
const rejectRide = async (req, res) => {
    try {
        const { driveId } = req.body;
        if (!driveId) {
            return res.status(404).json({ message: "Please enter driver id" });
        }
        const passengerId = req.user.id;
        if (!passengerId) {
            return res.status(400).json({ message: "Passenger id not found" });
        }
        const ride = await Ride.findOne({ drive: driveId, passenger: passengerId });
        const drive = await Drive.findById(driveId);

        if (!ride || !drive) {
            return res.status(404).json({ message: "Drive or ride not found" });
        }
        //Save changes
        ride.passengerStatus = "rejected";
        ride.rejectedAt = new Date();
        await ride.save();
        drive.driveStatus = "pending";
        await drive.save();

        //Notify driver of rejected ride
        const driver = await User.findById(drive.driver);
        const passenger = await User.findById(passengerId);
        await createNotification("rideRejected", driver._id, {
            passengerName: passenger.username,
            from: drive.from,
            to: drive.to
        });

        res.status(200).send();
    }
    catch (err) {
        console.error("Error updating drive status:", err);
        res.status(500).send();
    }
}
export default rejectRide;