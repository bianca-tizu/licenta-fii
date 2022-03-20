import mongoose from "mongoose";

export const QuestionSchema = new mongoose.Schema({
  id: {
    type: mongoose.ObjectId,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  category: {
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
});

export const Question = mongoose.model("Question", QuestionSchema);
