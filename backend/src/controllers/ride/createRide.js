import Ride from "../../models/Ride.js";
import User from "../../models/User.js";
import Drive from "../../models/Drive.js";
import createNotification from "../../crud/createNotification.js";

const createRide = async (req, res) => {
    try {
        const { driveId, seats } = req.body;
        if (!driveId || !seats) {
            return res.status(404).json({ message: "Please enter drive id and seats" });
        }

        const passengerId = req.user.id;
        if (!passengerId) {
            return res.status(400).json({ message: "Passenger id not found" });
        }

        //Check for seats availability
        const drive = await Drive.findById(driveId);
        if (!drive) {
            return res.status(404).json({ message: "Drive not found" });
        }

        if (drive.seatsAvailable === 0) {
            return res.status(400).json({ message: "No seats available" });
        }

        //Create Ride Request
        await Ride.create({
            drive: driveId,
            passenger: passengerId,
            passengerStatus: "accepted",
            seats: seats
        });

        //Update drive seats
        drive.seatsAvailable = drive.seatsAvailable - seats;
        await drive.save();

        //Get the driverId to notify
        const driverId = await User.findById(drive.driver);
        const passenger = await User.findById(passengerId);

        //Notify driver about ride request
        await createNotification("rideRequested", driverId, {
            passengerName: passenger.username,
            from: drive.from,
            to: drive.to,
            linkId: drive._id
        });

        res.status(201).json();
    }
    catch (err) {
        console.error("Error creating new ride:", err);
        res.status(500).send();
    }
}
export default createRide;