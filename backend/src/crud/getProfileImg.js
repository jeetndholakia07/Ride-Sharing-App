import cloudinary from "cloudinary";
import cloudinaryConfig from "../config/cloudinary.js";
cloudinaryConfig();

const getProfileImg = async (publicId, format, isProfileUpdated) => {
    if (!isProfileUpdated) return publicId;

    const signedUrl = cloudinary.v2.url(publicId, {
        type: "private",
        sign_url: true,
        secure: true,
        format
    });

    return signedUrl;
};

export default getProfileImg;