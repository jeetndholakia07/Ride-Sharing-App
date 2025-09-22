import User from "../models/User.js";
import UserProfile from "../models/UserProfile.js";
import cloudinary from "cloudinary";
import getProfileImg from "./getProfileImg.js";

const getDriverDetails = async (userId) => {
    try {
        const driver = await User.findById(userId);
        if (!driver) return null;

        const profile = await UserProfile.findOne({ user: userId });
        const profileImg = await getProfileImg(profile.profileImg.publicId, profile.profileImg.format, profile.isProfileUpdated);

        return {
            username: driver.username,
            mobile: driver.mobile,
            profileImg: profileImg
        }
    }
    catch (err) {
        console.error("Error getting driver details:", err);
        return null;
    }
}
export default getDriverDetails;