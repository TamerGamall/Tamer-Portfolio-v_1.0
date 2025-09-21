const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 30
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        },
        password_hash: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },
        role: {
            type: String,
            enum: ['admin'],
            default: 'admin',
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
const User = mongoose.model('User', userSchema);
module.exports = User;