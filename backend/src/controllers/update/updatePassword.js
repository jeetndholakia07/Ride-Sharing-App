import User from "../../models/User.js";
import bcrypt from "bcrypt";

const updatePassword = async (req, res) => {
    try {
        const { userId, password } = req.body;
        if (!userId || !password) {
            return res.status(404).json({ message: "Please enter userId and password" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send();
    }
    catch (err) {
        console.error("Error updating password:", err);
        res.status(501).send();
    }
}
export default updatePassword;