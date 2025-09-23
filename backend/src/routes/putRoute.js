import express from "express";
import updateProfile from "../controllers/update/updateProfile.js";
import updateProfileImg from "../controllers/update/updateProfileImg.js";
import cancelRide from "../controllers/update/cancelRide.js";
import acceptRide from "../controllers/update/acceptRide.js";
import completeRide from "../controllers/update/completeRide.js";
import rejectRide from "../controllers/update/rejectRide.js";
import updatePassword from "../controllers/update/updatePassword.js";
import updateDrive from "../controllers/update/updateDrive.js";
import updateNotificationRead from "../controllers/update/updateNotificationRead.js";
import multer from "multer";

const putRouter = express.Router();
const upload = multer({ dest: "uploads/" });

putRouter.use(express.urlencoded({ extended: true }));
putRouter.use(express.json());

putRouter.put("/updateProfileImg", upload.single("profileImg"), updateProfileImg);
putRouter.put("/updateProfile", updateProfile);
putRouter.put("/cancelRide", cancelRide);
putRouter.put("/acceptRide", acceptRide);
putRouter.put("/rejectRide", rejectRide);
putRouter.put("/completeRide", completeRide);
putRouter.put("/updatePassword", updatePassword);
putRouter.put("/updateDrive", updateDrive);
putRouter.put("/updateNotificationRead", updateNotificationRead);

export default putRouter;