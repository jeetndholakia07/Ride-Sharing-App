import User from "../../models/User.js";

const getUserByMobile = async (req, res) => {
    try {
        const { mobile } = req.body;
        if (!mobile) {
            return res.status(404).json({ message: "Please provide mobile number" });
        }
        const user = await User.findOne({ mobile: mobile });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).send();
    }
    catch (err) {
        console.error("Error getting user by mobile:", err);
        res.status(501).send();
    }
}
export default getUserByMobile;