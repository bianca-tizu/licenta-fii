import { Notification } from "../models/Notification.model.js";

const removeSeenNotifications = async userId => {
  try {
    await Notification.deleteMany({
      user: userId,
      $or: [
        { type: "USER" },
        { $and: [{ type: "SYSTEM_CHALLENGE", seen: true }] },
      ],
    });
  } catch (err) {
    console.error(err);
  }
};
export default removeSeenNotifications;
