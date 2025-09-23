import Ride from "../../models/Ride.js";
import User from "../../models/User.js";
import Drive from "../../models/Drive.js";
import createNotification from "../../crud/createNotification.js";

const createRide = async (req, res) => {
    try {
        const { driveId, passengerId } = req.body;
        if (!driveId || !passengerId) {
            return res.status(404).json({ message: "Please drive and passengerId id" });
        }

        //Check for role
        const passenger = await User.findById(passengerId);
        if (passenger.role !== "passenger") {
            return res.status(400).json({ message: "Only rider role can request for rides" });
        }

        //Check if user already has the ride
        const ride = await Ride.findOne({ passenger: passengerId, drive: driveId });
        if (ride) {
            return res.status(400).json({ message: "The given user already has the ride." });
        }

        //Check for seats availability
        const drive = await Drive.findById(driveId);
        if (drive.seatsAvailable === 0) {
            return res.status(400).json({ message: "No seats available" });
        }

        //Update drive seats
        drive.seatsAvailable--;
        await drive.save();

        //Create Ride Request
        await Ride.create({
            drive: driveId,
            passenger: passengerId,
            passengerStatus: "accepted"
        });

        //Get the driverId to notify
        const driverId = await User.findById(drive.driver);

        //Notify driver about ride request
        await createNotification("rideRequested", driverId, {
            passengerName: passenger.username,
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