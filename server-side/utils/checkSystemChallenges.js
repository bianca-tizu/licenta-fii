import { Challenges } from "../models/Challenges.model.js";
import { User } from "../models/User.model.js";
import { Comment } from "../models/Comment.model.js";
import { Notification } from "../models/Notification.model.js";
import { updateUserLevel } from "./updateUserLevel.js";

const getCurrentChallenge = (challenges, id) => {
  return challenges.filter(challenge => challenge.lookupId === id)[0];
};

const isNotificationAlready = async (currentNotification, userId) => {
  const notificationsInDB = await Notification.find({
    message: currentNotification,
    user: userId,
  });

  return notificationsInDB;
};

const addNotification = async (message, userId) => {
  const notification = new Notification({
    message: message,
    user: userId,
    type: "SYSTEM_CHALLENGE",
  });

  const existsNotification = await isNotificationAlready(message, userId);
  if (existsNotification.length < 1) {
    return await notification.save();
  }
};
const checkAndUpdateFirstQuestion = async (challenges, userId) => {
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

    const { message } = addNotification(
      "Hooray, you've added your first question",
      userId
    );
    return message;
  }
};

const checkAndUpdateFirstAnswer = async (challenges, userId) => {
  const comments = await Comment.find({ author: userId });
  console.log("comments", comments);
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
      await updateUserLevel(userId, "system");
      const { message } = await addNotification(
        "Hooray, you've added your first answer",
        userId
      );
      return message;
    }
  }
};

const checkAndUpdateFiveAnswers = async (challenges, userId) => {
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
      const { message } = addNotification(
        "Wooow, you've made it! You've managed to add 5 answers.",
        userId
      );
      return message;
    }
  } else if (comments.length > 0 && comments.length < 5) {
    await Challenges.updateOne(
      {
        author: userId,
        systemChallengeId: challengeToUpdate.systemChallengeId,
      },
      { $set: { status: "progress" } }
    );
    const { message } = addNotification(
      "Yay, you've started to work on the 5 answers challenge.",
      userId
    );
    return message;
  }
};

const checkAndUpdateFiveQuestions = async (questions, challenges, userId) => {
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
      const { message } = addNotification(
        "Wooow, you've made it! You've managed to add 5 questions.",
        userId
      );
      return message;
    }
  } else if (questions.length > 0 && questions.length < 5) {
    await Challenges.updateOne(
      {
        author: userId,
        systemChallengeId: challengeToUpdate.systemChallengeId,
      },
      { $set: { status: "progress" } }
    );
    const { message } = addNotification(
      "Yay, you've started to work on the 5 questions challenge.",
      userId
    );
    return message;
  }
};

const dailyAppCheckin = async (challenges, userId) => {
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
      const { message } = addNotification(
        "Yay, you checked the app daily. Good job!",
        userId
      );
      return message;
    }
  }
};

const addPersonalChallenge = async (challenges, userId) => {
  const challengeToUpdate = getCurrentChallenge(challenges, 6);
  const personalChallenges = challenges.filter(
    challenge => !challenge.isSystemChallenge
  );
  const areSystemChallengesChecked = User.find({
    _id: userId,
    challengesChecked: true,
  });

  if (personalChallenges.length === 1 && areSystemChallengesChecked) {
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
      const { message } = addNotification(
        "You did it! You added your first challenge.",
        userId
      );
      return message;
    }
  }
};

export const checkSystemChallenges = async (questions, challenges, userId) => {
  try {
    const notifications = [];
    if (questions.length >= 1) {
      const firstQuestion = await checkAndUpdateFirstQuestion(
        challenges,
        userId
      );
      firstQuestion && notifications.push(firstQuestion);
      if (questions.length >= 5) {
        const firstFiveQuestion = await checkAndUpdateFiveQuestions(
          questions,
          challenges,
          userId
        );
        firstFiveQuestion && notifications.push(firstFiveQuestion);
      }
    }

    const firstAnswer = await checkAndUpdateFirstAnswer(challenges, userId);
    console.log("firstAnswer", firstAnswer);
    firstAnswer && notifications.push(firstAnswer);

    const firstFiveAnswers = await checkAndUpdateFiveAnswers(
      challenges,
      userId
    );
    console.log("firstFiveAnswers", firstFiveAnswers);

    firstFiveAnswers && notifications.push(firstFiveAnswers);

    const dailyCheckin = await dailyAppCheckin(challenges, userId);
    dailyCheckin && notifications.push(dailyCheckin);

    const personalChallenge = await addPersonalChallenge(challenges, userId);
    personalChallenge && notifications.push(personalChallenge);

    await User.findOneAndUpdate(
      { _id: userId, challengesChecked: false },
      { $set: { challengesChecked: true } }
    );

    console.log(notifications);

    return notifications;
  } catch (err) {
    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { challengesChecked: false } }
    );
  }
};
