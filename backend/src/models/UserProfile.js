import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fullName: {
        type: String
    },
    email: {
        type: String,
        required: false,
        validate: {
            validator: function (value) {
                if (value && value.trim() !== "") {
                    return /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
                }
                return true;
            },
            message: (props) => `Invalid email format. Got value ${props.value}`,
        },
    },
    isProfileUpdated: {
        type: Boolean,
        default: false
    },
    profileImg: {
        publicId: { type: String, required: true },
        format: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true }
    },
}, { timestamps: true });

const Profile = mongoose.model("UserProfile", UserProfileSchema);

export default Profile;