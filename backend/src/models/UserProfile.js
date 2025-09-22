import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: (value) => /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
            message: "Invalid email format. Got value {VALUE}"
        }
    },
    role: {
        type: String,
        enum: ["rider", "driver", "both"],
        default: "both"
    },
    profileImg: {
        publicId: { type: String, required: true },
        format: { type: String, required: true },
    },
   
}, { timestamps: true });

const Profile = mongoose.model("UserProfile", UserProfileSchema);

export default Profile;