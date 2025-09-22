import cloudinary from "cloudinary";
import cloudinaryConfig from "../../config/cloudinary.js";
import UserProfile from "../../models/UserProfile.js";
import fs from "fs";

cloudinaryConfig();

const updateProfileImg = async (req, res) => {
    let filePath;
    try {
        const { userId } = req.body;
        filePath = req.file.path;
        if (!filePath) {
            return res.status(400).json({ message: "No file path provided" });
        }

        if (!userId) {
            return res.status(404).json({ message: "Please provide userId" });
        }

        const userProfile = await UserProfile.findOne({ user: userId });
        if (!userProfile) {
            return res.status(404).json({ message: "User Profile doesn't exist" });
        }

        const result = await cloudinary.v2.uploader.upload(filePath, {
            public_id: `userProfile/${userId}`,
            folder: "user_profiles",
            type: "private",
            overwrite: true,
            resource_type: "image",
            transformation: [
                { width: 300, height: 300, crop: "thumb" },
                { quality: "auto" }
            ]
        }).catch((err) => console.error("Error uploading profile image to cloudinary:", err));

        userProfile.profileImg = {
            publicId: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height
        }
    }
    catch (err) {
        console.error("Error updating profile image:", err);
        res.status(501).send();
    }
    finally {
        await fs.promises.unlink(filePath)
            .catch((err) => console.error("Error deleting upload:", err));
    }
}
export default updateProfileImg;