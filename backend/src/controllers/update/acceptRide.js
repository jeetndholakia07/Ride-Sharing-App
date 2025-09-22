import Ride from "../../models/Ride.js";
import User from "../../models/User.js";
import createNotification from "../../crud/createNotification.js";

const acceptRide = async (req, res) => {
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
        ride.driverStatus = "confirmed";
        await ride.save();

        //Notify passenger of accepted ride
        await createNotification("rideAccepted", rideId, {
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
export default acceptRide;