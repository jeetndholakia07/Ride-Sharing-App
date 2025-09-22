import mongoose from "mongoose";

const driveSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    vehicleDetails: {
        vehicleType: { type: String, required: true },
        vehicleName: { type: String, required: true },
        vehicleNumber: { type: String, required: true },
        seatsAvailable: { type: Number, required: true }
    }
}, { timestamps: true });

const Drive = mongoose.model("Drive", driveSchema);
export default Drive;