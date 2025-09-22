import Ride from "../../models/Ride.js";
import User from "../../models/User.js";
import createNotification from "../../crud/createNotification.js";

const rejectRide = async (req, res) => {
    try {
        const { rideId, driveId } = req.body;
        if (!rideId || !driveId) {
            return res.status(404).json({ message: "Please enter driver id and ride id." });
        }
        const ride = await Ride.findOne({ driver: driveId, passenger: rideId });

        if (!ride) {
            return res.status(404).json({ message: "Drive or ride not found" });
        }
        //Save changes
        ride.passengerStatus = "rejected";
        await ride.save();

        const passenger = await User.findById(rideId);

        //Notify driver of rejected ride
        await createNotification("rideRejected", driveId, {
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