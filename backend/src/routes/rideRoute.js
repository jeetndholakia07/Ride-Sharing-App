import express from "express";
import getRidesForRider from "../controllers/read/getRidesForRider.js";
import getDrivesForDriver from "../controllers/read/getDrivesForDriver.js";
import createDrive from "../controllers/create/createDrive.js";
import createRide from "../controllers/create/createRide.js";
import cancelRide from "../controllers/update/cancelRide.js";
import acceptRide from "../controllers/update/acceptRide.js";
import completeRide from "../controllers/update/completeRide.js";
import rejectRide from "../controllers/update/rejectRide.js";
import updateDrive from "../controllers/update/updateDrive.js";
import authorizeRole from "../middlewares/authorizeRole.js";

const rideRoute = express.Router();
rideRoute.use(express.json());
rideRoute.use(express.urlencoded({ extended: true }));

rideRoute.get("/ridesForRider", getRidesForRider);
rideRoute.get("/ridesForDriver", getDrivesForDriver);
rideRoute.post("/ride", authorizeRole(["passenger"]), createRide);
rideRoute.post("/drive", authorizeRole(["driver"]), createDrive);
rideRoute.put("/cancelRide", authorizeRole(["driver"]), cancelRide);
rideRoute.put("/acceptRide", authorizeRole(["driver"]), acceptRide);
rideRoute.put("/completeRide", authorizeRole(["driver"]), completeRide);
rideRoute.put("/rejectRide", authorizeRole(["passenger"]), rejectRide);
rideRoute.put("/editDrive", updateDrive);


export default rideRoute;