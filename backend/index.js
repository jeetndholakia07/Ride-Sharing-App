import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/authRoute.js";
import postRouter from "./src/routes/postRoute.js";
import putRouter from "./src/routes/putRoute.js";
import getRouter from "./src/routes/getRoute.js";
import verifyUser from "./src/middlewares/verifyUser.js";

const app = express();

dotenv.config({ quiet: true });

const baseURL = "/peerRide/api";
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`${baseURL}`, authRouter);
app.use(`${baseURL}`, verifyUser, postRouter);
app.use(`${baseURL}`, verifyUser, putRouter);
app.use(`${baseURL}`, verifyUser, getRouter);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on PORT ${PORT}`);
});