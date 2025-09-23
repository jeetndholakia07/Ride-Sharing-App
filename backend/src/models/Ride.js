import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    drive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drive",
        required: true
    },
    rideName: {
        type: String,
        required: true
    },
    passengerStatus: {
        type: String,
        enum: ["accepted", "rejected"],
    },
    requestedAt: {
        type: Date,
        default: Date.now
    },
    rejectedAt: {
        type: Date
    }
}, { timestamps: true });

const Ride = mongoose.model("Ride", rideSchema);
export default Ride;