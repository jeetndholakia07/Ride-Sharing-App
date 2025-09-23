import Drive from "../../models/Drive.js";

const createDrive = async (req, res) => {
    try {
        const { from, to, departureTime, vehicleDetails, seatsAvailable } = req.body;
        if (!from || !to || !departureTime || !vehicleDetails || !seatsAvailable) {
            return res.status(404).json({ message: "Please enter all fields" });
        }
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "User id not found" });
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