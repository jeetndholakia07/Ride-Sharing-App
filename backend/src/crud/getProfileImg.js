import cloudinary from "cloudinary";

const getProfileImg = async (publicId, format, isProfileUpdated) => {
    let profileImg = publicId;
    if (isProfileUpdated) {
        const signedUrl = cloudinary.v2.url(`${publicId}/${format}`, {
            type: "private",
            sign_url: true,
            secure: true
        });
        profileImg = signedUrl;
    }
    return profileImg;
}

export default getProfileImg;