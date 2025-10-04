import User from "../../models/User.js";

const getUserByMobile = async (req, res) => {
    try {
        const { mobile } = req.body;
        const userId = req.user.id;
        if (!mobile) {
            return res.status(404).json({ message: "Please provide mobile number" });
        }
        if (!userId) {
            return res.status(400).json({ message: "User id not found" });
        }
        const user = await User.findOne({ mobile: mobile });
        const matchUser = await User.findById(userId);
        if (!matchUser) {
            return res.status(400).json({ message: "User not found" });
        }
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (!user._id.equals(matchUser._id)) {
            return res.status(401).json({ message: "User doesn't match" });
        }
        res.status(200).send();
    }
    catch (err) {
        console.error("Error getting user by mobile:", err);
        res.status(500).send();
    }
}
export default getUserByMobile;