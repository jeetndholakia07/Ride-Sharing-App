import express from "express";
import createDrive from "../controllers/create/createDrive.js";
import createRide from "../controllers/create/createRide.js";
import getUserProfile from "../controllers/read/getUserProfile.js";
import getNotifications from "../controllers/read/getNotifications.js";
import createRating from "../controllers/create/createRating.js";
import getDrivesForDriver from "../controllers/read/getDrivesForDriver.js";
import getRidesForRider from "../controllers/read/getRidesForRider.js";

const postRouter = express.Router();
postRouter.use(express.urlencoded({ extended: true }));
postRouter.use(express.json());

postRouter.post("/createDrive", createDrive);
postRouter.post("/createRide", createRide);
postRouter.post("/getUserProfile", getUserProfile);
postRouter.post("/getNotifications", getNotifications);
postRouter.post("/createRating", createRating);
postRouter.post("/getDrivesForDriver", getDrivesForDriver);
postRouter.post("/getRidesForRider", getRidesForRider);

export default postRouter;