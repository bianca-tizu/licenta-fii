import { Notification } from "../models/Notification.model.js";

const notificationsResolver = {
  Query: {
    getAllNotifications: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to see notifications.");
      }

      return await Notification.find({ user: context.user._id });
    },
  },
  Mutation: {
    createNotification: async (parent, args, context) => {
      const { message, type } = args;
      if (!context.user) {
        throw new Error("You're not allowed to create notifications.");
      }

      const notification = new Notification({
        message,
        type,
        seen: false,
        user: context.user._id,
      });

      const result = await notification.save();

      await User.findByIdAndUpdate(
        context.user._id,
        { $push: { notifications: result._id } },
        { new: true, useFindAndModify: false }
      ).populate("notifications");

      return { ...result };
    },
  },
  updateNotificationStatus: async (parent, args, context) => {
    if (!context.user) {
      throw new Error("You're not allowed to create notifications.");
    }

    try {
      await Notification.deleteMany({
        user: context.user._id,
        $or: [
          { type: "USER" },
          { $and: [{ type: "SYSTEM_CHALLENGE", seen: true }] },
        ],
      });
    } catch (err) {
      console.error(err);
    }

    const notification = await Notification.find({
      user: context.user._id,
      _id: args.notificationId,
    });

    if (notification) {
      await Notification.updateOne(
        { _id: args.notificationId },
        { $set: { seen: true } }
      );
      return notification;
    }
  },
  removeNotifications: async (parent, args, context) => {
    if (!context.user) {
      throw new Error("You're not allowed to remove notifications.");
    }
    try {
      const removed = await Notification.deleteMany({
        user: context.user._id,
        $or: [
          { type: "USER" },
          { $and: [{ type: "SYSTEM_CHALLENGE" }, { seen: true }] },
        ],
      });
      return !!removed;
    } catch (err) {
      console.error(err);
    }
  },
};
export default notificationsResolver;
