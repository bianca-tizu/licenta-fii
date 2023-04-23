import { User } from "../models/User.model.js";
import { Notification } from "../models/Notification.model.js";

export const updateUserLevel = async (userId, challengeType) => {
  const user = await User.findById(userId);
  let notifications = [];
  let insertedNotifications = [];

  if (user.life < 100) {
    user.life += 10;
    notifications.push("You've gained some life");
  }

  if (user.level < 5 && user.experience < 50) {
    user.experience += challengeType === "system" ? 20 : 3;
    notifications.push("Congrats, you've gained 20 exp.");
    if (user.experience >= 50) {
      user.level++;
      user.life = 100;
      user.experience = user.experience - 50;
      notifications.push(`Yay, you got to the ${user.level} level`);
    }
  } else if (user.level >= 5 && user.level <= 10 && user.experience < 75) {
    user.experience += challengeType === "system" ? 15 : 3;
    notifications.push("Congrats, you've gained 15 exp.");

    if (user.experience >= 75) {
      user.level++;
      user.life = 100;
      user.experience = user.experience - 75;
      notifications.push(`Yay, you got to the ${user.level} level`);
    }
  } else if (user.level > 10 && user.level < 25 && user.experience < 100) {
    user.experience += challengeType === "system" ? 10 : 3;
    notifications.push("Congrats, you've gained 10 exp.");

    if (user.experience >= 100) {
      user.level++;
      user.life = 100;
      user.experience = user.experience - 100;
      notifications.push(`Yay, you got to the ${user.level} level`);
    }
  } else if (user.level >= 25 && user.experience < 150) {
    user.experience += challengeType === "system" ? 5 : 3;
    notifications.push("Congrats, you've gained 5 exp.");

    if (user.experience >= 150) {
      user.level++;
      user.life = 100;
      user.experience = user.experience - 150;
      notifications.push(`Yay, you got to the ${user.level} level`);
    }
  }

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: userId,
      $or: [
        { life: { $ne: user.life } },
        { level: { $ne: user.level } },
        { experience: { $ne: user.experience } },
      ],
    },
    {
      $set: {
        life: user.life,
        level: user.level,
        experience: user.experience,
      },
    }
  );

  if (notifications) {
    const mappedNotifications = notifications.map(notification => {
      return { message: notification, user: user._id, type: "USER" };
    });

    insertedNotifications = await Notification.insertMany(mappedNotifications, {
      upsert: true,
    });
    notifications = [];
  }

  return { user: updatedUser, notifications: insertedNotifications };
};
