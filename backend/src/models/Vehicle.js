import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    vehicleDetails: {
        vehicleType: { type: String },
        vehicleName: { type: String },
        vehicleNumber: { type: String }
    },
    isSaved: {
        type: Boolean,
        default: true
    }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;