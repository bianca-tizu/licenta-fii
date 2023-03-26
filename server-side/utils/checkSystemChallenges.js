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

const checkAndUpdateFirstQuestion = async (challenges, userId) => {
  const challengeToUpdate = challenges.filter(challenge =>
    challenge.content.includes("first question")
  )[0];
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
  const challengeToUpdate = challenges.filter(challenge =>
    challenge.content.includes("Answer to a question")
  )[0];

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
  const challengeToUpdate = challenges.filter(challenge =>
    challenge.content.includes("5 consecutive answers")
  )[0];

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
  const challengeToUpdate = challenges.filter(challenge =>
    challenge.content.includes("5 consecutive questions")
  )[0];
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

export const checkSystemChallenges = (questions, challenges, userId) => {
  if (questions.length > 0) {
    checkAndUpdateFirstQuestion(challenges, userId);
    checkAndUpdateFiveQuestions(questions, challenges, userId);
  }

  checkAndUpdateFirstAnswer(challenges, userId);
  checkAndUpdateFiveAnswers(challenges, userId);
};
