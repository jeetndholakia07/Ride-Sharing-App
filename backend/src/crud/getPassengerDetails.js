import User from "../models/User.js";
import UserProfile from "../models/UserProfile.js";
import cloudinary from "cloudinary";
import getProfileImg from "./getProfileImg.js";

const getPassengerDetails = async (userId) => {
    try {
        const passenger = await User.findById(userId);
        if (!passenger) return null;
        const profile = await UserProfile.findOne({ user: userId });
        const profileImg = await getProfileImg(profile.profileImg.publicId, profile.profileImg.format, profile.isProfileUpdated);
        return {
            username: passenger.username,
            mobile: passenger.mobile,
            collegeName: passenger.collegeName,
            profileImg: profileImg
        }
    }
    catch (err) {
        console.error("Error getting passenger details:", err);
        return null;
    }
}
export default getPassengerDetails;