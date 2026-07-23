import { boolean } from 'joi';
import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 20,
        required: [true, "Name is Required"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Name is Required"]
    },
    password: {
        type: String,
        required:[true, "Password is required"],
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ['customer', 'seller', 'admin'],
        default: 'customer',
    },
    isVerified: {
        type: boolean,
        default: false,
    },

    verificationToken: {
        type: String,
        select: false,
    },
    refreshToken: {
        type: String,
        select: false,
    },
    resetPasswordToken: {
        type: String,
        select: false,
    },
    resetPasswordExpires: {
        type: Date,
        select: false,
    },


}, {timestamps: true})

export default mongoose.model("User", userSchema);