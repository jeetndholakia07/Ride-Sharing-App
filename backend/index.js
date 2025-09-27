import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoute from "./src/routes/authRoute.js";
import publicRoute from "./src/routes/publicRoute.js";
import userRoute from "./src/routes/userRoute.js";
import rideRoute from "./src/routes/rideRoute.js";
import verifyUser from "./src/middlewares/verifyUser.js";

const app = express();

dotenv.config({ quiet: true });

const baseURL = "/peerRide/api";
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`${baseURL}/public`, publicRoute);
app.use(`${baseURL}/auth`, authRoute);
app.use(`${baseURL}/user`, verifyUser, userRoute);
app.use(`${baseURL}/ride`, verifyUser, rideRoute);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on PORT ${PORT}`);
});