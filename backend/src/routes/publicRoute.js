import express from "express";
import getRatings from "../controllers/read/getRatings.js";
import getRidesonLocation from "../controllers/read/getRidesOnLocation.js";

const publicRouter = express.Router();

publicRouter.get("/ratings", getRatings);
publicRouter.post("/rides", getRidesonLocation);

export default publicRouter;