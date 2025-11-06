import FrequentRide from "../../models/FrequentRide.js";

const createFrequentRide = async (req, res) => {
    try {
        const { from, to } = req.body;
        if (!from || !to) {
            return res.status(400).json({ message: "Please provide from and to" });
        }
        const frequentRide = await FrequentRide.findOne({ from: from, to: to });
        if (frequentRide) {
            return res.status(400).json({ message: "Frequent ride already exists" });
        }

        await FrequentRide.create({
            from: from,
            to: to
        });

        res.status(201).send();
    } catch (err) {
        console.error("Error creating frequent ride:", err);
        res.status(500).json({ message: "Server error" });
    }
}
export default createFrequentRide;