import Drive from "../../models/Drive.js";
import User from "../../models/User.js";

const createDrive = async (req, res) => {
    try {
        const { userId, from, to, departureTime, vehicleDetails } = req.body;
        if (!userId || !from || !to || !departureTime || !vehicleDetails) {
            return res.status(404).json({ message: "Please enter all fields" });
        }
        const user = await User.findById(userId);
        if (user.role !== "driver") {
            return res.status(401).json({ message: "Only driver role can create drives" });
        }
        const newDrive = await Drive.create({
            driver: userId,
            from: from,
            to: to,
            departureTime: departureTime,
            vehicleDetails: {
                vehicleType: vehicleDetails.vehicleType,
                vehicleName: vehicleDetails.vehicleName,
                vehicleNumber: vehicleDetails.vehicleNumber,
                seatsAvailable: vehicleDetails.seatsAvailable
            }
        });

        res.status(201).json(newDrive);
    }
    catch (err) {
        console.error("Error creating a drive:", err);
        res.status(501).send();
    }
}
export default createDrive;