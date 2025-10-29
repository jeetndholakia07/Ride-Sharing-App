import express from "express";
import getRidesForRider from "../controllers/ride/getRidesForRider.js";
import getDrivesForDriver from "../controllers/ride/getDrivesForDriver.js";
import createDrive from "../controllers/ride/createDrive.js";
import createRide from "../controllers/ride/createRide.js";
import cancelRide from "../controllers/ride/cancelRide.js";
import acceptRide from "../controllers/ride/acceptRide.js";
import completeRide from "../controllers/ride/completeRide.js";
import rejectRide from "../controllers/ride/rejectRide.js";
import updateDrive from "../controllers/ride/updateDrive.js";
import addRatingForDriver from "../controllers/ride/addRatingForDriver.js";
import checkRide from "../controllers/ride/checkRide.js";
import getRideById from "../controllers/ride/getRideById.js";
import getDriveById from "../controllers/ride/getDriveById.js";
import authorizeRole from "../middlewares/authorizeRole.js";

const rideRoute = express.Router();
rideRoute.use(express.json());
rideRoute.use(express.urlencoded({ extended: true }));

rideRoute.get("/ridesForRider", authorizeRole(["passenger"]), getRidesForRider);
rideRoute.get("/ridesForDriver", authorizeRole(["driver"]), getDrivesForDriver);
rideRoute.get("/ride", authorizeRole(["passenger"]), getRideById);
rideRoute.get("/drive", authorizeRole(["driver"]), getDriveById);
rideRoute.post("/ride", authorizeRole(["passenger"]), createRide);
rideRoute.post("/drive", authorizeRole(["driver"]), createDrive);
rideRoute.put("/cancelRide", authorizeRole(["driver"]), cancelRide);
rideRoute.put("/acceptRide", authorizeRole(["driver"]), acceptRide);
rideRoute.put("/completeRide", authorizeRole(["driver"]), completeRide);
rideRoute.put("/rejectRide", authorizeRole(["passenger"]), rejectRide);
rideRoute.post("/checkRide", authorizeRole(["passenger"]), checkRide);
rideRoute.put("/editDrive", updateDrive);
rideRoute.put("/addRatingForDriver", authorizeRole(["passenger"]), addRatingForDriver);

export default rideRoute;