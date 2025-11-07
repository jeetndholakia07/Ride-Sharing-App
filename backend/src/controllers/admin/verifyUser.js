import User from "../../models/User.js";
import UserProfile from "../../models/UserProfile.js";
import addVerifiedBadge from "../../crud/addVerifiedBadge.js";
import cloudinary from "cloudinary";

const verifyUser = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User id is required" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        user.isVerified = true;

        const profile = await UserProfile.findOne({ user: userId });
        if (!profile) {
            return res.status(400).json({ message: "User profile not found" });
        }

        let finalUrl;
        const finalPublicId = profile.profileImg.publicId;
        const result = await addVerifiedBadge(finalPublicId);
        if (result.eager && result.eager.length > 0) {
            finalUrl = result.eager[0].secure_url;
        }

        const derivedFile = finalUrl;

        const uploadOptions = {
            public_id: finalPublicId,
            overwrite: true,
            resource_type: "image",
        };

        if (profile.profileImg.isUpdated) {
            uploadOptions.type = "private";
        }

        const overwrite = await cloudinary.v2.uploader.upload(derivedFile, uploadOptions);
        finalUrl = overwrite.secure_url;

        // Update the profile image with new info
        profile.profileImg = {
            publicId: finalPublicId,
            format: overwrite.format,
            width: 300,
            height: 300,
        };
        profile.profileImg.isUpdated = true;

        // Save the profile and user
        await profile.save();
        await user.save();

        res.status(200).send();
    } catch (err) {
        console.error("Error verifying user:", err);
        res.status(500).json({ message: "Server error" });
    }
}

export default verifyUser;
