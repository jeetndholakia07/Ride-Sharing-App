import express from "express";
import getRidesOnLocation from "../controllers/read/getRidesOnLocation.js";
import getRatings from "../controllers/read/getRatings.js";
import getRidesForRider from "../controllers/read/getRidesForRider.js";
import getDrivesForDriver from "../controllers/read/getDrivesForDriver.js";
import getUserProfile from "../controllers/read/getUserProfile.js";
import getUserData from "../controllers/read/getUserData.js";
import getNotifications from "../controllers/read/getNotifications.js";
import getUserRating from "../controllers/read/getUserRating.js";

const getRouter = express.Router();
getRouter.use(express.urlencoded({ extended: true }));
getRouter.use(express.json());

getRouter.get("/getRidesOnLocation", getRidesOnLocation);
getRouter.get("/getRatings", getRatings);
getRouter.get("/getRidesForRider", getRidesForRider);
getRouter.get("/getDrivesForDriver", getDrivesForDriver);
getRouter.get("/getUserProfile", getUserProfile);
getRouter.get("/getUserData", getUserData);
getRouter.get("/getNotifications", getNotifications);
getRouter.get("/getUserRating", getUserRating);

export default getRouter;