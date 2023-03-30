import { Challenges } from "../models/Challenges.model.js";
import { User } from "../models/User.model.js";
import { Comment } from "../models/Comment.model.js";

const updateUserLevel = async userId => {
  const user = await User.findById(userId);
  if (user.life < 100) {
    user.life += 10;
  }

  if (user.level < 5 && user.experience < 50) {
    user.experience += 20;
    if (user.experience >= 50) {
      user.level++;
      user.life = 100;
      user.experience = user.experience - 50;
    }
  } else if (user.level >= 5 && user.level <= 10 && user.experience < 75) {
    user.experience += 15;
    if (user.experience >= 75) {
      user.level++;
      user.life = 100;
      user.experience = user.experience - 75;
    }
  } else if (user.level > 10 && user.level < 25 && user.experience < 100) {
    user.experience += 10;
    if (user.experience >= 100) {
      user.level++;
      user.life = 100;
      user.experience = user.experience - 100;
    }
  } else if (user.level >= 25 && user.experience < 150) {
    user.experience += 5;
    if (user.experience >= 150) {
      user.level++;
      user.life = 100;
      user.experience = user.experience - 150;
    }
  }

  await User.updateOne(
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
};

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
    updateUserLevel(userId);
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
      updateUserLevel(userId);
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
      updateUserLevel(userId);
    }
  } else if (comments.length > 0 && comments.length < 5) {
    await Challenges.updateOne(
      {
        author: userId,
        systemChallengeId: challengeToUpdate.systemChallengeId,
      },
      { $set: { status: "progress" } }
    );
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
      updateUserLevel(userId);
    }
  } else if (questions.length > 0 && questions.length < 5) {
    await Challenges.updateOne(
      {
        author: userId,
        systemChallengeId: challengeToUpdate.systemChallengeId,
      },
      { $set: { status: "progress" } }
    );
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
      { $set: { status: "finished" } }
    );
    if (updatedChallenge.matchedCount) {
      updateUserLevel(userId);
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
      updateUserLevel(userId);
    }
  }
};

export const checkSystemChallenges = async (questions, challenges, userId) => {
  try {
    if (questions.length > 0) {
      checkAndUpdateFirstQuestion(challenges, userId);
      checkAndUpdateFiveQuestions(questions, challenges, userId);
    }

    checkAndUpdateFirstAnswer(challenges, userId);
    checkAndUpdateFiveAnswers(challenges, userId);
    dailyAppCheckin(challenges, userId);
    addPersonalChallenge(challenges, userId);

    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { challengesChecked: true } }
    );
  } catch (err) {
    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { challengesChecked: false } }
    );
  }
};
