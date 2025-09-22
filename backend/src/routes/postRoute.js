import express from "express";
import createDrive from "../controllers/create/createDrive.js";
import createRide from "../controllers/create/createRide.js";
import getUserProfile from "../controllers/read/getUserProfile.js";
import getUserCollegeID from "../controllers/read/getUserCollegeID.js";
import getNotifications from "../controllers/read/getNotifications.js";
import getRideRequestForDriver from "../controllers/read/getRideRequestForDriver.js";
import createNotification from "../controllers/create/createNotification.js";
import createRating from "../controllers/create/createRating.js";

const postRouter = express.Router();
postRouter.use(express.urlencoded({ extended: true }));
postRouter.use(express.json());

postRouter.post("/createDrive", createDrive);
postRouter.post("/createRide", createRide);
postRouter.post("/getUserProfile", getUserProfile);
postRouter.post("/getNotifications", getNotifications);
postRouter.post("/getRideRequestForDriver", getRideRequestForDriver);
postRouter.post("/getUserCollegeID", getUserCollegeID);
postRouter.post("/createNotification", createNotification);
postRouter.post("/createRating", createRating);

export default postRouter;