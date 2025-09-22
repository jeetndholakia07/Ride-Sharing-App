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
    rideDetails: {
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
    },
    passengerStatus: {
        type: String,
        enum: ["accepted", "rejected"],
    },
    driverStatus: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending"
    },
    requestedAt: {
        type: Date,
        default: Date.now
    },
    acceptedAt: { type: Date },
    rejectedAt: { type: Date },
    completedAt: {
        type: Date
    }
}, { timestamps: true });

const Ride = mongoose.model("Ride", rideSchema);
export default Ride;