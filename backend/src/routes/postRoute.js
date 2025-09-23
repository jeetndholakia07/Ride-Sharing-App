import express from "express";
import createDrive from "../controllers/create/createDrive.js";
import createRide from "../controllers/create/createRide.js";
import createRating from "../controllers/create/createRating.js";
import getUserByMobile from "../controllers/read/getUserByMobile.js";

const postRouter = express.Router();
postRouter.use(express.urlencoded({ extended: true }));
postRouter.use(express.json());

postRouter.post("/createDrive", createDrive);
postRouter.post("/createRide", createRide);
postRouter.post("/createRating", createRating);
postRouter.post("/getUserByMobile", getUserByMobile);

export default postRouter;