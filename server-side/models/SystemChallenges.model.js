import mongoose from "mongoose";
import { User } from "./User.model.js";

export const SystemChallengesSchema = new mongoose.Schema({
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
    default: "started",
  },
  isSystemChallenge: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
  },
});

export const SystemChallenges = mongoose.model(
  "SystemChallenges",
  SystemChallengesSchema
);
