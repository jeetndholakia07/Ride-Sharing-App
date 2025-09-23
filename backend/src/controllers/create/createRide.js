import Ride from "../../models/Ride.js";
import User from "../../models/User.js";
import Drive from "../../models/Drive.js";
import createNotification from "../../crud/createNotification.js";
import { getDate, generateRideName } from "../../utils/format.js";

const createRide = async (req, res) => {
    try {
        const { driveId } = req.body;
        if (!driveId) {
            return res.status(404).json({ message: "Please enter drive id" });
        }

        const passengerId = req.user.id;
        if (!passengerId) {
            return res.status(400).json({ message: "Passenger id not found" });
        }

        //Check for role
        const passenger = await User.findById(passengerId);
        if (!passenger) {
            return res.status(404).json({ message: "Passenger not found" });
        }
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
        if (!drive) {
            return res.status(404).json({ message: "Drive not found" });
        }
        if (drive.seatsAvailable === 0) {
            return res.status(400).json({ message: "No seats available" });
        }

        //Generate ride name
        const rideName = generateRideName(drive.from, drive.to, getDate(drive.departureTime));

        //Create Ride Request
        await Ride.create({
            drive: driveId,
            passenger: passengerId,
            passengerStatus: "accepted",
            rideName: rideName
        });

        //Update drive seats
        drive.seatsAvailable = drive.seatsAvailable - 1;
        await drive.save();

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