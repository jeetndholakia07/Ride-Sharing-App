import Drive from "../../models/Drive.js";

const updateDrive = async (req, res) => {
    try {
        const { driveId, from, to, departureTime, vehicleDetails } = req.body;
        if (!driveId || !from || !to || !departureTime || !vehicleDetails) {
            return res.status(404).json({ message: "Please enter driveId and all necessary details" });
        }
        const drive = await Drive.findOne({ driver: driveId });
        if (!drive) {
            return res.status(404).json({ message: "No drive found" });
        }
        drive.from = from;
        drive.to = to;
        drive.departureTime = departureTime;
        drive.vehicleDetails = vehicleDetails;
        await drive.save();
        res.status(201).send();
    }
    catch (err) {
        console.error("Error updating drive:", err);
        res.status(501).send();
    }
}
export default updateDrive;