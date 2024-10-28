import mongoose from "mongoose";
import { ObjectId } from 'mongoose';


const userModel = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: "active" },
    joined: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },
    about: { type: String, default: "I am a new user" },
    avatar: { type: String, default: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" },
    createdTrips: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    likedTrips: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
})

const User = mongoose.model('User', userModel);
export default User;