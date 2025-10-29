import Drive from "../../models/Drive.js";

const createDrive = async (req, res) => {
    try {
        const { from, to, departureTime, vehicleName, vehicleType, vehicleNumber, seats, comments, price } = req.body;
        if (!from || !to || !departureTime || !vehicleName || !vehicleType || !vehicleNumber || !seats || comments === null || !price) {
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
            seatsAvailable: seats,
            vehicleDetails: {
                vehicleType: vehicleType,
                vehicleName: vehicleName,
                vehicleNumber: vehicleNumber,
            },
            specialNote: comments,
            pricePerPerson: price
        });
        res.status(201).json();
    }
    catch (err) {
        console.error("Error creating a drive:", err);
        res.status(500).send();
    }
}
export default createDrive;