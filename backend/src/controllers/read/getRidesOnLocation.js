import Drive from "../../models/Drive.js";

const getRidesOnLocation = async (req, res) => {
    try {
        const { from, to } = req.query;
        if (!from || !to) {
            return res.status(404).json({ message: "Please enter from and to location" });
        }
        const drives = await Drive.find({
            from: { $regex: from, $options: "i" },
            to: { $regex: to, $options: "i" }
        });

        res.status(200).json(drives);
    }
    catch (err) {
        console.error("Error getting rides based on location:", err);
        res.status(501).send();
    }
}
export default getRidesOnLocation;