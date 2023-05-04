import { Challenges } from "../models/Challenges.model.js";
import { User } from "../models/User.model.js";
import { Comment } from "../models/Comment.model.js";
import { Notification } from "../models/Notification.model.js";
import { updateUserLevel } from "./updateUserLevel.js";

const getCurrentChallenge = (challenges, id) => {
  return challenges.filter(challenge => challenge.lookupId === id)[0];
};

const isNotificationAlready = (dbNotifications, currentNotification) => {
  return dbNotifications.some(
    notification => notification.message === currentNotification.message
  );
};

const checkAndUpdateFirstQuestion = async (
  challenges,
  userId,
  notificationsInDB
) => {
  const challengeToUpdate = getCurrentChallenge(challenges, 1);

  const updatedChallenge = await Challenges.updateOne(
    {
      author: userId,
      systemChallengeId: challengeToUpdate.systemChallengeId,
      status: { $ne: "finished" },
    },
    { $set: { status: "finished" } }
  );

  if (updatedChallenge.matchedCount) {
    updateUserLevel(userId, "system");

    const notification = new Notification({
      message: "Hooray, you've added your first question",
      user: userId,
      type: "SYSTEM_CHALLENGE",
    });

    if (!isNotificationAlready(notificationsInDB, notification)) {
      await notification.save();
    }
  }
};

const checkAndUpdateFirstAnswer = async (
  challenges,
  userId,
  notificationsInDB
) => {
  const comments = await Comment.find({ author: userId });
  const challengeToUpdate = getCurrentChallenge(challenges, 2);

  if (comments.length) {
    const updatedChallenge = await Challenges.updateOne(
      {
        author: userId,
        systemChallengeId: challengeToUpdate.systemChallengeId,
        status: { $ne: "finished" },
      },
      { $set: { status: "finished" } }
    );
    if (updatedChallenge.matchedCount) {
      updateUserLevel(userId, "system");

      const notification = new Notification({
        message: "Hooray, you've added your first answer",
        user: userId,
        type: "SYSTEM_CHALLENGE",
      });

      if (!isNotificationAlready(notificationsInDB, notification)) {
        await notification.save();
      }
    }
  }
};

const checkAndUpdateFiveAnswers = async (
  challenges,
  userId,
  notificationsInDB
) => {
  const comments = await Comment.find({ author: userId });
  const challengeToUpdate = getCurrentChallenge(challenges, 5);

  if (comments.length >= 5) {
    const updatedChallenge = await Challenges.updateOne(
      {
        author: userId,
        systemChallengeId: challengeToUpdate.systemChallengeId,
        status: { $ne: "finished" },
      },
      { $set: { status: "finished" } }
    );
    if (updatedChallenge.matchedCount) {
      updateUserLevel(userId, "system");

      const notification = new Notification({
        message: "Wooow, you've made it! You've managed to add 5 answers.",
        user: userId,
        type: "SYSTEM_CHALLENGE",
      });
      if (!isNotificationAlready(notificationsInDB, notification)) {
        await notification.save();
      }
    }
  } else if (comments.length > 0 && comments.length < 5) {
    await Challenges.updateOne(
      {
        author: userId,
        systemChallengeId: challengeToUpdate.systemChallengeId,
      },
      { $set: { status: "progress" } }
    );

    const notification = new Notification({
      message: "Yay, you've started to work on the 5 answers challenge.",
      user: userId,
      type: "SYSTEM_CHALLENGE",
    });
    if (!isNotificationAlready(notificationsInDB, notification)) {
      await notification.save();
    }
  }
};

const checkAndUpdateFiveQuestions = async (
  questions,
  challenges,
  userId,
  notificationsInDB
) => {
  const challengeToUpdate = getCurrentChallenge(challenges, 4);
  if (questions.length >= 5) {
    const updatedChallenge = await Challenges.updateOne(
      {
        author: userId,
        systemChallengeId: challengeToUpdate.systemChallengeId,
        status: { $ne: "finished" },
      },
      { $set: { status: "finished" } }
    );

    if (updatedChallenge.matchedCount) {
      updateUserLevel(userId, "system");

      const notification = new Notification({
        message: "Wooow, you've made it! You've managed to add 5 questions.",
        user: userId,
        type: "SYSTEM_CHALLENGE",
      });
      if (!isNotificationAlready(notificationsInDB, notification)) {
        await notification.save();
      }
    }
  } else if (questions.length > 0 && questions.length < 5) {
    await Challenges.updateOne(
      {
        author: userId,
        systemChallengeId: challengeToUpdate.systemChallengeId,
      },
      { $set: { status: "progress" } }
    );

    const notification = new Notification({
      message: "Yay, you've started to work on the 5 questions challenge.",
      user: userId,
      type: "SYSTEM_CHALLENGE",
    });
    if (!isNotificationAlready(notificationsInDB, notification)) {
      await notification.save();
    }
  }
};

const dailyAppCheckin = async (challenges, userId, notificationsInDB) => {
  const today = new Date();
  const yesterday = new Date(today.getDate());

  const { loginTimestamp, challengesChecked } = await User.findById(userId);
  const yesterdayLoginTimestamp = new Date(loginTimestamp.getDate());

  const challengeToUpdate = getCurrentChallenge(challenges, 3);

  yesterday.setDate(today.getDate() - 1);
  yesterdayLoginTimestamp.setDate(loginTimestamp.getDate() - 1);

  if (
    yesterdayLoginTimestamp.getDate() === yesterday.getDate() &&
    !challengesChecked
  ) {
    const updatedChallenge = await Challenges.updateOne(
      {
        author: userId,
        systemChallengeId: challengeToUpdate.systemChallengeId,
        status: { $ne: "finished" },
      },
      { $set: { status: "progress" } }
    );
    if (updatedChallenge.matchedCount) {
      updateUserLevel(userId, "system");

      const notification = new Notification({
        message: "Yay, you checked the app daily. Good job!",
        user: userId,
        type: "SYSTEM_CHALLENGE",
      });
      if (!isNotificationAlready(notificationsInDB, notification)) {
        await notification.save();
      }
    }
  }
};

const addPersonalChallenge = async (challenges, userId, notificationsInDB) => {
  const challengeToUpdate = getCurrentChallenge(challenges, 6);
  const personalChallenges = challenges.filter(
    challenge => !challenge.isSystemChallenge
  );
  const areSystemChallengesChecked = User.find({
    _id: userId,
    challengesChecked: true,
  });

  if (personalChallenges.length && areSystemChallengesChecked) {
    const updatedChallenge = await Challenges.updateOne(
      {
        author: userId,
        systemChallengeId: challengeToUpdate.systemChallengeId,
        status: { $ne: "finished" },
      },
      { $set: { status: "finished" } }
    );
    if (updatedChallenge.matchedCount) {
      updateUserLevel(userId, "system");

      const notification = new Notification({
        message: "You did it! You added your first challenge.",
        user: userId,
        type: "SYSTEM_CHALLENGE",
      });
      if (!isNotificationAlready(notificationsInDB, notification)) {
        await notification.save();
      }
    }
  }
};

export const checkSystemChallenges = async (questions, challenges, userId) => {
  try {
    const notificationsInDB = await Notification.find({
      user: userId,
    });

    if (questions.length) {
      await checkAndUpdateFirstQuestion(challenges, userId, notificationsInDB);

      await checkAndUpdateFiveQuestions(
        questions,
        challenges,
        userId,
        notificationsInDB
      );
    }

    await checkAndUpdateFirstAnswer(challenges, userId, notificationsInDB);

    await checkAndUpdateFiveAnswers(challenges, userId, notificationsInDB);

    await dailyAppCheckin(challenges, userId, notificationsInDB);

    await addPersonalChallenge(challenges, userId, notificationsInDB);

    await User.findOneAndUpdate(
      { _id: userId, challengesChecked: false },
      { $set: { challengesChecked: true } }
    );
  } catch (err) {
    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { challengesChecked: false } }
    );
  }
};
