import mongoose from "mongoose";
import { User } from "./User.model.js";

export const ChallengesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  status: {
    type: String,
    enum: ["started", "progress", "finished"],
  },
  isSystemChallenge: {
    type: Boolean,
    required: true,
    default: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
  },
});

export const Challenges = mongoose.model("Challenges", ChallengesSchema);
