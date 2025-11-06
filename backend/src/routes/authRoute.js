import express from "express";
import multer from "multer";
import createUser from "../controllers/auth/createUser.js";
import login from "../controllers/auth/login.js";
import loginAdmin from "../controllers/admin/login.js";

const authRouter = express.Router();
authRouter.use(express.urlencoded({ extended: true }));
authRouter.use(express.json());

const upload = multer({ dest: "uploads/" });

authRouter.post("/registerUser", upload.single("collegeID"), createUser);

authRouter.post("/loginUser", login);

authRouter.post("/login-admin", loginAdmin);

export default authRouter;