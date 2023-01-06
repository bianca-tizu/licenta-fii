import mongoose from "mongoose";
import { User } from "./User.model.js";
import { Question } from "./Question.model.js";

export const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
});

export const Comment = mongoose.model("Comment", CommentSchema);
