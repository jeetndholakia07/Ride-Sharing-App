import mongoose from "mongoose";

const frequentRideSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }
}, { timestamps: true });

const FrequentRide = mongoose.model("FrequentRide", frequentRideSchema);

export default FrequentRide;