import { Challenges } from "../models/Challenges.model.js";
import { User } from "../models/User.model.js";
import { Comment } from "../models/Comment.model.js";
import { Notification } from "../models/Notification.model.js";
import { updateUserLevel } from "./updateUserLevel.js";

const getCurrentChallenge = (challenges, id) => {
  return challenges.filter(challenge => challenge.lookupId === id)[0];
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

    return "Hooray, you've added your first question";
  }
};

const checkAndUpdateFirstAnswer = async (challenges, userId) => {
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

      return "Hooray, you've added your first answer";
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
      return "Wooow, you've made it! You've managed to add 5 answers.";
    }
  } else if (comments.length > 0 && comments.length < 5) {
    await Challenges.updateOne(
      {
        author: userId,
        systemChallengeId: challengeToUpdate.systemChallengeId,
      },
      { $set: { status: "progress" } }
    );
    return "Yay, you've started to work on the 5 answers challenge.";
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

      return "Wooow, you've made it! You've managed to add 5 questions.";
    }
  } else if (questions.length > 0 && questions.length < 5) {
    await Challenges.updateOne(
      {
        author: userId,
        systemChallengeId: challengeToUpdate.systemChallengeId,
      },
      { $set: { status: "progress" } }
    );
    return "Yay, you've started to work on the 5 questions challenge.";
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
      return "Yay, you checked the app daily. Good job!";
    }
  }
};

const addPersonalChallenge = async (challenges, userId) => {
  const challengeToUpdate = getCurrentChallenge(challenges, 6);
  const personalChallenges = challenges.filter(
    challenge => !challenge.isSystemChallenge
  );

  if (personalChallenges.length) {
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

      return "You did it! You added your first challenge.";
    }
  }
};

export const checkSystemChallenges = async (questions, challenges, userId) => {
  try {
    const notifications = [];
    if (questions.length > 0) {
      const firstQuestion = await checkAndUpdateFirstQuestion(
        challenges,
        userId
      );

      if (firstQuestion) {
        notifications.push(firstQuestion);
      }
      const fiveQuestions = await checkAndUpdateFiveQuestions(
        questions,
        challenges,
        userId
      );
      if (fiveQuestions) {
        notifications.push(fiveQuestions);
      }
    }

    const firstAnswer = await checkAndUpdateFirstAnswer(challenges, userId);
    if (firstAnswer) {
      notifications.push(firstAnswer);
    }
    const fiveAnswers = await checkAndUpdateFiveAnswers(challenges, userId);
    if (fiveAnswers) {
      notifications.push(fiveAnswers);
    }
    const dailyCheckin = await dailyAppCheckin(challenges, userId);
    if (dailyCheckin) {
      notifications.push(dailyCheckin);
    }
    const personalChallenge = await addPersonalChallenge(challenges, userId);
    if (personalChallenge) {
      notifications.push(personalChallenge);
    }

    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { challengesChecked: true } }
    );

    notifications.forEach(async notification => {
      const existsInDB = await Notification.find({
        message: notification,
        user: userId,
      });

      if (!existsInDB.length) {
        const newNotification = new Notification({
          message: notification,
          user: userId,
          type: "SYSTEM_CHALLENGE",
        });
        await newNotification.save();
      }
    });
    return notifications;
  } catch (err) {
    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { challengesChecked: false } }
    );
  }
};
