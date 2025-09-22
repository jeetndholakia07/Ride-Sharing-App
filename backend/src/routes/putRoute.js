import express from "express";
import updateProfile from "../controllers/update/updateProfile.js";
import multer from "multer";

const putRouter = express.Router();
const upload = multer({ dest: "uploads/" });

putRouter.use(express.urlencoded({ extended: true }));
putRouter.use(express.json());

putRouter.put("/updateProfile", upload.single("profileImg"), updateProfile);

export default putRouter;