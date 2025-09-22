import express from "express";
import updateProfile from "../controllers/update/updateProfile.js";
import updateProfileImg from "../controllers/update/updateProfileImg.js";
import multer from "multer";

const putRouter = express.Router();
const upload = multer({ dest: "uploads/" });

putRouter.use(express.urlencoded({ extended: true }));
putRouter.use(express.json());

putRouter.put("/updateProfileImg", upload.single("profileImg"), updateProfileImg);
putRouter.put("/updateProfile", updateProfile);

export default putRouter;