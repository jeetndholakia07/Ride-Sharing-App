import User from "../../models/User.js";
import cloudinary from "cloudinary";

const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(404).json({ message: "Please enter user id." });
        }
        const findUser = await User.findById(userId);
        const { publicId, format } = findUser.collegeIDProof;
        const signedUrl = cloudinary.v2.url(`${publicId}/${format}`, {
            type: "private",
            sign_url: true,
            secure: true
        });
        const response = {
            username: findUser.username,
            mobile: findUser.mobile,
            collegeName: findUser.collegeName,
            role: findUser.role,
            collegeIDProof: signedUrl
        };

        if (!findUser) {
            return res.status(404).json({ message: "Requested user not found" });
        }
        res.status(200).json(response);
    }
    catch (err) {
        console.error("Error getting user data:", err);
        res.status(501).send();
    }
}
export default getUserData;