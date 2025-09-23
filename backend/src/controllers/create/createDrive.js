import Drive from "../../models/Drive.js";
import User from "../../models/User.js";

const createDrive = async (req, res) => {
    try {
        const { userId, from, to, departureTime, vehicleDetails, seatsAvailable } = req.body;
        if (!userId || !from || !to || !departureTime || !vehicleDetails || !seatsAvailable) {
            return res.status(404).json({ message: "Please enter all fields" });
        }
        const user = await User.findById(userId);

        //Check if user has driver role
        if (user.role !== "driver") {
            return res.status(401).json({ message: "Only driver role can create drives" });
        }
        await Drive.create({
            driver: userId,
            from: from,
            to: to,
            departureTime: departureTime,
            seatsAvailable: seatsAvailable,
            vehicleDetails: {
                vehicleType: vehicleDetails.vehicleType,
                vehicleName: vehicleDetails.vehicleName,
                vehicleNumber: vehicleDetails.vehicleNumber,
            }
        });
        res.status(201).json();
    }
    catch (err) {
        console.error("Error creating a drive:", err);
        res.status(501).send();
    }
}
export default createDrive;