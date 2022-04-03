import mongoose from "mongoose";
import validator from "validator";
import { Question } from "./Question.model.js";

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
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

export const User = mongoose.model("User", UserSchema);
