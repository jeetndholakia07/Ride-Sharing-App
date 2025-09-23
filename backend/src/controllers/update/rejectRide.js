import Ride from "../../models/Ride.js";
import User from "../../models/User.js";
import Drive from "../../models/Drive.js";
import createNotification from "../../crud/createNotification.js";

/* Reject ride request by passenger */
const rejectRide = async (req, res) => {
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
        ride.passengerStatus = "rejected";
        ride.rejectedAt = new Date();
        await ride.save();

        //Notify driver of rejected ride
        const driver = await User.findById(drive.driver);
        const passenger = await User.findById(passengerId);
        await createNotification("rideRejected", driver._id, {
            passengerName: passenger.username,
            from: ride.rideDetails.from,
            to: ride.rideDetails.to
        });

        res.status(200).send();
    }
    catch (err) {
        console.error("Error updating drive status:", err);
        res.status(501).send();
    }
}
export default rejectRide;