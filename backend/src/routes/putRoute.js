import express from "express";
import updateProfile from "../controllers/update/updateProfile.js";
import updateProfileImg from "../controllers/update/updateProfileImg.js";
import cancelDrive from "../controllers/update/cancelDrive.js";
import acceptRide from "../controllers/update/acceptRide.js";
import completeRide from "../controllers/update/completeRide.js";
import rejectRide from "../controllers/update/rejectRide.js";
import forgetPassword from "../controllers/update/forgetPassword.js";
import updateDrive from "../controllers/update/updateDrive.js";
import multer from "multer";

const putRouter = express.Router();
const upload = multer({ dest: "uploads/" });

putRouter.use(express.urlencoded({ extended: true }));
putRouter.use(express.json());

putRouter.put("/updateProfileImg", upload.single("profileImg"), updateProfileImg);
putRouter.put("/updateProfile", updateProfile);
putRouter.put("/cancelDrive", cancelDrive);
putRouter.put("acceptRide", acceptRide);
putRouter.put("/rejectRide", rejectRide);
putRouter.put("/completeRide", completeRide);
putRouter.put("/forgetPassword", forgetPassword);
putRouter.put("/updateDrive", updateDrive);

export default putRouter;