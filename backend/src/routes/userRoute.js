import express from "express";
import getUserProfile from "../controllers/read/getUserProfile.js";
import getUserData from "../controllers/read/getUserData.js";
import getNotifications from "../controllers/read/getNotifications.js";
import getUserRating from "../controllers/read/getUserRating.js";
import getProfileImage from "../controllers/read/getProfileImg.js";
import getUserByMobile from "../controllers/read/getUserByMobile.js";
import createRating from "../controllers/create/createRating.js";
import updateProfile from "../controllers/update/updateProfile.js";
import updateProfileImg from "../controllers/update/updateProfileImg.js";
import updatePassword from "../controllers/update/updatePassword.js";
import updateNotificationRead from "../controllers/update/updateNotificationRead.js";
import multer from "multer";

const userRoute = express.Router();

userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }));
const upload = multer({ dest: "uploads/" });

userRoute.get("/userData", getUserData);
userRoute.get("/userProfile", getUserProfile);
userRoute.get("/profileImage", getProfileImage);
userRoute.get("/notifications", getNotifications);
userRoute.get("/userRating", getUserRating);
userRoute.post("/verifyUser", getUserByMobile);
userRoute.post("/rating", createRating);
userRoute.put("/userProfile", updateProfile);
userRoute.put("/profileImage", upload.single("profileImg"), updateProfileImg);
userRoute.put("/editPassword", updatePassword);
userRoute.put("/notificationRead", updateNotificationRead);

export default userRoute;