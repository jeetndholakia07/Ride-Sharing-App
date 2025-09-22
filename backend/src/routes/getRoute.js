import express from "express";
import getRidesOnLocation from "../controllers/read/getRidesOnLocation.js";
import getRatings from "../controllers/read/getRatings.js";

const getRouter = express.Router();
getRouter.use(express.urlencoded({ extended: true }));
getRouter.use(express.json());

getRouter.get("/getRidesOnLocation", getRidesOnLocation);
getRouter.get("/getRatings", getRatings);

export default getRouter;