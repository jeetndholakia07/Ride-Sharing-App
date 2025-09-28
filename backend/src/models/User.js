import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    mobile: {
        type: String,
        validate: {
            validator: (value) => /^\d{10}$/.test(value),
            message: "Invalid mobile format. Got value {VALUE}"
        },
        unique: true
    },
    role: {
        type: String,
        enum: ["passenger", "driver"],
        required: true
    },
    collegeName: {
        type: String,
        required: function () {
            return this.role === 'passenger';
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    collegeIDProof: {
        type: {
            publicId: { type: String },
            format: { type: String },
            width: { type: Number },
            height: { type: Number }
        },
        required: function () {
            return this.role === 'passenger';
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;