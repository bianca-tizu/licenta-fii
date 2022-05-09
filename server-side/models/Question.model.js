import mongoose from "mongoose";
import { User } from "./User.model.js";

export const QuestionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
  },
  tags: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
  },
  isDraft: {
    type: Boolean,
  },
});

export const Question = mongoose.model("Question", QuestionSchema);
