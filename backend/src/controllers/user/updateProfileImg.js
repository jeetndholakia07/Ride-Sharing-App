import UserProfile from "../../models/UserProfile.js";
import uploadImage from "../../crud/uploadImage.js";
import fs from "fs";

const updateProfileImg = async (req, res) => {
    let filePath;
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "User id not found" });
        }
        filePath = req.file.path;
        if (!filePath) {
            return res.status(400).json({ message: "No file path provided" });
        }

        const userProfile = await UserProfile.findOne({ user: userId });
        if (!userProfile) {
            return res.status(404).json({ message: "User Profile doesn't exist" });
        }

        const result = await uploadImage(filePath, "user_profiles", userId);

        userProfile.profileImg = {
            publicId: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height
        }
        userProfile.isProfileUpdated = true;
        await userProfile.save();
        res.status(200).send();
    }
    catch (err) {
        console.error("Error updating profile image:", err);
        res.status(500).send();
    }
    finally {
        await fs.promises.unlink(filePath)
            .catch((err) => console.error("Error deleting upload:", err));
    }
}
export default updateProfileImg;