import cloudinaryConfig from "../../config/cloudinary.js";
import cloudinary from "cloudinary";
import { slugify } from "../../utils/format.js";
import User from "../../models/User.js";
import UserProfile from "../../models/UserProfile.js";
import fs from "fs";
import bcrypt from "bcrypt";

cloudinaryConfig();

const createUser = async (req, res) => {
    let filePath;
    try {
        const { username, mobile, collegeName, password, role } = req.body;
        filePath = req.file.path;
        const formattedName = slugify(username);
        //Upload the image to cloudinary
        const result = await cloudinary.v2.uploader.upload(filePath, {
            public_id: `collegeID/${formattedName}`,
            folder: "collegeIDProof",
            type: "private",
            overwrite: true,
            resource_type: "image",
            transformation: [
                { width: 300, height: 300, crop: "thumb" },
                { quality: "auto" }
            ]
        }).catch((err) => console.error("Error uploading collegeID to cloudinary:", err));

        //Create hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create the user
        const newUser = await User.create({
            username: username,
            mobile: mobile,
            role: role,
            collegeName: collegeName,
            password: hashedPassword,
            collegeIDProof: {
                publicId: result.public_id,
                format: result.format,
                width: result.width,
                height: result.height
            }
        });

        //Create User Profile with default profile image
        await UserProfile.create({
            user: newUser.id,
            email: "",
            fullName: "",
            profileImg: {
                publicId: "https://res.cloudinary.com/peerride/image/upload/v1758367695/account_heoa8t.png",
                format: "png",
                width: 300,
                height: 300
            }
        });

        res.status(201).send();
    }
    catch (err) {
        console.error("Error creating user:", err);
        res.status(501).send();
    }
    finally {
        await fs.promises.unlink(filePath)
            .catch((err) => console.error("Error deleting upload:", err));
    }
}
export default createUser;