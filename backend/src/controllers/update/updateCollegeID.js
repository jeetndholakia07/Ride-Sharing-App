import User from "../../models/User.js";
import cloudinary from "cloudinary";
import cloudinaryConfig from "../../config/cloudinary.js";
import fs from "fs";
import { slugify } from "../../utils/format.js";

cloudinaryConfig();

const updateCollegeID = async (req, res) => {
    try {
        let filePath;
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "User id not found" });
        }
        filePath = req.file.path;
        if (!filePath) {
            return res.status(400).json({ message: "No file path provided" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const formattedName = slugify(user.username);
        const result = await cloudinary.v2.uploader.upload(filePath, {
            public_id: `collegeIDProof/${formattedName}`,
            type: "private",
            overwrite: true,
            resource_type: "image",
            transformation: [
                { width: 300, height: 300, crop: "thumb" },
                { quality: "auto" }
            ]
        }).catch((err) => console.error("Error uploading profile image to cloudinary:", err));

        user.collegeIDProof = {
            publicId: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height
        };

        await user.save();
        res.status(201).send();
    }
    catch (err) {
        console.error("Error updating collegeID:", err);
        res.status(501).send();
    }
    finally {
        if (filePath) {
            await fs.promises.unlink(filePath)
                .catch((err) => console.error("Error deleting upload:", err));
        }
    }
}
export default updateCollegeID;