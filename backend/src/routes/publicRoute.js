import express from "express";
import getRatings from "../controllers/general/getRatings.js";
import getRidesonLocation from "../controllers/general/getRidesOnLocation.js";

const publicRouter = express.Router();

publicRouter.get("/ratings", getRatings);
publicRouter.post("/rides", getRidesonLocation);

export default publicRouter;