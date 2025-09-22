import Ride from "../../models/Ride.js";

const getRideRequestForDriver = async (req, res) => {
    try {
        const { driverId } = req.body;
        if (!driverId) {
            return res.status(404).json({ message: "Please enter driverId" });
        }
        const rideRequests = await Ride.find({ driver: driverId }).populate("passenger", "username mobile collegeName");

        res.status(200).json(rideRequests);
    }
    catch (err) {
        console.error("Error getting ride requests for driver:", err);
        res.status(501).send();
    }
}
export default getRideRequestForDriver;