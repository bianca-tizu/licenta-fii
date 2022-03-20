import mongoose from "mongoose";
import { QuestionSchema } from "./Question.model.js";

export const UserSchema = new mongoose.Schema({
  id: {
    type: mongoose.ObjectId,
    required: true,
    default: () => {
      return new mongoose.Types.ObjectId();
    },
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  questions: {
    type: [QuestionSchema],
  },
});

export const User = mongoose.model("User", UserSchema);
