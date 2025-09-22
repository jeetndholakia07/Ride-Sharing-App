import User from "../../models/User.js";
import cloudinary from "cloudinary";

const getUserCollegeID = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(404).json({ message: "Please enter userId" });
        }
        const user = await User.findById(userId);
        if (!user || !user.collegeIDURL) {
            return res.status(404).json({ message: "User or image not found" });
        }
        const { publicId, format } = user.collegeIDURL;

        const signedUrl = cloudinary.v2.url(`${publicId}.${format}`, {
            type: "private",
            sign_url: true,
            secure: true
        });
        res.status(200).json(signedUrl);
    }
    catch (err) {
        console.error("Error getting user college id:", err);
        res.status(501).send();
    }
}
export default getUserCollegeID;