import Ride from "../../models/Ride.js";
import User from "../../models/User.js";
import createNotification from "../../crud/createNotification.js";

const completeRide = async (req, res) => {
    try {
        const { rideId, driveId } = req.body;
        if (!rideId || !driveId) {
            return res.status(404).json({ message: "Please enter driver id and ride id." });
        }
        const ride = await Ride.findOne({ driver: driveId, passenger: rideId });
        const driver = await User.findById(driveId);
        if (!ride) {
            return res.status(404).json({ message: "Drive or ride not found" });
        }
        //Save changes
        ride.driverStatus = "completed";
        await ride.save();

        //Notify passenger of completed ride
        await createNotification("rideCompleted", rideId, {
            driverName: driver.username,
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
export default completeRide;