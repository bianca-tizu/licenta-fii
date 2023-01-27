import mongoose from "mongoose";
import { User } from "./User.model.js";
import { Question } from "./Question.model.js";

export const VotesSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
export const Votes = mongoose.model("Votes", VotesSchema);
