import User from "../../models/User.js";
import UserProfile from "../../models/UserProfile.js";
import fs from "fs";
import bcrypt from "bcrypt";
import uploadImage from "../../crud/uploadImage.js";

const createUser = async (req, res) => {
    let filePath;
    let result;
    try {
        const { username, mobile, collegeName, password, role } = req.body;
        if (role === "passenger") {
            if (!req.file || !req.file.path) {
                return res.status(400).json({ message: "College ID image is required for passengers." });
            }
            filePath = req.file.path;
            //Upload the image to cloudinary
            result = await uploadImage(filePath, "collegeIDProof", username);
        }

        //Create hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create the user
        const newUser = await User.create({
            username: username,
            mobile: mobile,
            role: role,
            ...(role === "passenger" && { collegeName: collegeName }),
            password: hashedPassword,
            ...(role === "passenger" && result && {
                collegeIDProof: {
                    publicId: result.public_id,
                    format: result.format,
                    width: result.width,
                    height: result.height
                }
            })
        });

        //Create User Profile with default profile image
        await UserProfile.create({
            user: newUser.id,
            email: "",
            fullName: "",
            profileImg: {
                publicId: process.env.DEFAULT_PROFILE,
                format: "png",
                width: 300,
                height: 300
            }
        });

        res.status(201).send();
    }
    catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send();
    }
    finally {
        if (filePath) {
            await fs.promises.unlink(filePath)
                .catch((err) => console.error("Error deleting upload:", err));
        }
    }
}
export default createUser;