import mongoose from "mongoose";
import { User } from "./User.model.js";

export const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  type: {
    type: String,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Notification = mongoose.model("Notification", NotificationSchema);
