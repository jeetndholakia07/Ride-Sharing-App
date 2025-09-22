import cloudinary from "cloudinary";
import cloudinaryConfig from "../../config/cloudinary.js";
import UserProfile from "../../models/UserProfile.js";
import fs from "fs";

cloudinaryConfig();

const updateProfile = async (req, res) => {
    let filePath;
    try {
        const { userId, email, role } = req.body;
        const userProfile = await UserProfile.findOne({ user: userId });
        if (!userProfile) {
            return res.status(404).json({ message: "User Profile doesn't exist" });
        }
        filePath = req.file.path;
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

        userProfile.email = email;
        userProfile.role = role;
        userProfile.profileImg = {
            publicId: result.public_id,
            format: result.format
        }

        await userProfile.save();
        res.status(201).send();
    }
    catch (err) {
        console.error("Error updating profile:", err);
        res.status(501).send();
    }
    finally {
        await fs.promises.unlink(filePath)
            .catch((err) => console.error("Error deleting upload:", err));
    }
}
export default updateProfile;