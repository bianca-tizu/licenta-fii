import mongoose from "mongoose";
import validator from "validator";
import { Notification } from "./Notification.model.js";
import { Question } from "./Question.model.js";
import { Challenges } from "./Challenges.model.js";

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Enter an email address"],
    unique: [true, "That email address is taken"],
    lowercase: true,
    validate: [validator.isEmail, "Enter a valid email address"],
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Enter a password"],
    minLength: [4, "Password should be at least 4 characters"],
  },
  studentId: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  resetPassToken: {
    type: String,
  },
  resetPassExpire: {
    type: String,
  },
  joinedRewardSystem: {
    type: Boolean,
  },
  level: {
    type: Number,
    default: 1,
  },
  life: {
    type: Number,
    default: 100,
  },
  experience: {
    type: Number,
    default: 0,
  },
  loginTimestamp: {
    type: Date,
    default: new Date(),
  },
  challengesChecked: {
    type: Boolean,
    default: false,
  },
  challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Challenges" }],
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  notifications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
  ],
});

export const User = mongoose.model("User", UserSchema);
