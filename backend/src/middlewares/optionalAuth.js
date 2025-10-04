import jwt from "jsonwebtoken";
import User from "../models/User.js";

const optionalAuth = async (req, res, next) => {
    let token = req.header("Authorization");
    //If token exists, parse and check for authentication
    if (token) {
        try {
            token = token.replace("Bearer ", "");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const id = decoded.id;
            const user = await User.findById(id);
            if (!user) {
                return res.status(401).json({ message: "Invalid username or token provided" });
            }
            req.user = {
                id: user.id,
                role: user.role,
                username: user.username
            };
        }
        catch (err) {
            console.error("Error verifying user:", err);
            res.status(401).json({ message: "Invalid or expired token" });
        }
    }
    //Else, continue
    next();
}
export default optionalAuth;