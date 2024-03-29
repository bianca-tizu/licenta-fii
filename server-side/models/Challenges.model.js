import mongoose from "mongoose";
import { User } from "./User.model.js";
import { SystemChallenges } from "./SystemChallenges.model.js";

export const ChallengesSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["started", "progress", "finished"],
    default: "started",
  },
  isSystemChallenge: {
    type: Boolean,
    required: true,
    default: false,
  },
  lookupId: {
    type: Number,
  },
  systemChallengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SystemChallenges",
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
