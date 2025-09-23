import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Please enter username and password" });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "User doesn't exist" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password entered" });
        }
        const token = jwt.sign({ username: user.username, id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.status(200).json({ token, userId: findUser.id });
    }
    catch (err) {
        console.error("Error logging user:", err);
        res.status(501).send();
    }
}
export default login;