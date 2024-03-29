import mongoose from "mongoose";
import { User } from "./User.model.js";
import { Comment } from "./Comment.model.js";

export const QuestionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  content: {
    type: String,
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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

QuestionSchema.index({ title: "text", content: "text" });

export const Question = mongoose.model("Question", QuestionSchema);
