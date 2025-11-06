import express from "express";
import getRatings from "../controllers/general/getRatings.js";
import getRidesonLocation from "../controllers/general/getRidesOnLocation.js";
import getFrequentRides from "../controllers/general/getFrequentRides.js";

const publicRouter = express.Router();

publicRouter.get("/ratings", getRatings);
publicRouter.post("/rides", getRidesonLocation);
publicRouter.get("/frequent-rides", getFrequentRides);

export default publicRouter;