import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    mobile: {
        type: Number,
        validate: {
            validator: (value) => /^\d{10}$/.test(value),
            message: "Invalid mobile format. Got value {VALUE}"
        }
    },
    role: {
        type: String,
        enum: ["passenger", "driver"],
        required: true
    },
    collegeName: {
        type: String,
        required: [true, "College is required"],
        maxLength: [50, "College Name must not exceed 50 characters"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    collegeIDProof: {
        publicId: { type: String, required: true },
        format: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true }
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;