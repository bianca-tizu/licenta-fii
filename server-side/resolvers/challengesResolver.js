import { Challenges } from "../models/Challenges.model.js";
import { Question } from "../models/Question.model.js";
import { Notification } from "../models/Notification.model.js";
import { SystemChallenges } from "../models/SystemChallenges.model.js";
import { User } from "../models/User.model.js";

import { checkSystemChallenges } from "../utils/checkSystemChallenges.js";
import { updateUserLevel } from "../utils/updateUserLevel.js";

const challengesResolver = {
  Query: {
    getSystemChallenges: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to see challenges.");
      }

      const challengesCounter = await Challenges.find({
        author: context.user._id,
        isSystemChallenge: true,
      }).count();

      if (challengesCounter) {
        const challenges = await Challenges.find({
          isSystemChallenge: true,
        }).populate("author");

        const user = await User.findById(context.user._id);

        return {
          challenges: challenges ?? [],
          user: {
            life: challenges[0].author ? challenges[0].author.life : user.life,
            experience: challenges[0].author
              ? challenges[0].author.experience
              : user.experience,
          },
        };
      }
    },
    getPersonalChallenges: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to see challenges.");
      }

      const challengesCounter = await Challenges.find({
        author: context.user._id,
        isSystemChallenge: true,
      }).count();
      if (challengesCounter) {
        const challenges = await Challenges.find({
          isSystemChallenge: false,
          author: context.user._id,
        }).populate("author");
        const user = await User.findById(context.user._id);

        return {
          challenges: challenges ?? [],
          user: {
            life: challenges[0].author ? challenges[0].author.life : user.life,
            experience: challenges[0].author
              ? challenges[0].author.experience
              : user.experience,
          },
        };
      }
    },
    checkAndUpdateSystemChallengesStatus: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to see these challenges.");
      }

      try {
        const currentUser = await User.findById(context.user._id).populate(
          "challenges"
        );

        const notifications = await checkSystemChallenges(
          currentUser?.questions ?? [],
          currentUser?.challenges ?? [],
          context.user._id
        );
        return notifications;
      } catch (err) {
        throw new Error("Oops, there was a problem.");
      }
    },
  },
  Mutation: {
    createChallenge: async (parent, args, context) => {
      const { content, isSystemChallenge } = args.challenge;
      if (!context.user) {
        throw new Error("You're not allowed to create a challenge.");
      }

      const challenge = new Challenges({
        content: content ?? "",
        status: "started",
        isSystemChallenge: isSystemChallenge,
        author: context.user._id,
        createdAt: new Date(Date.now()),
      });

      const result = await challenge.save();
      const author = await User.findById(context.user._id);

      if (!author) {
        throw new Error("User not found");
      }
      await User.findByIdAndUpdate(
        context.user._id,
        { $push: { challenges: result._id } },
        { new: true, useFindAndModify: false }
      );

      return { ...result._doc, author: { ...author._doc } };
    },
    updateChallengeStatus: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to create a challenge.");
      }

      const challenge = await Challenges.findOne({
        _id: args.challengeId,
        author: context.user._id,
      }).populate("author");

      if (!challenge) {
        throw new Error("Challenge not found");
      } else {
        const updatedChallenge = await Challenges.findOneAndUpdate(
          {
            _id: challenge._id,
            author: context.user._id,
            status: { $ne: "finished" },
          },
          {
            $set: { status: "finished" },
          }
        );

        if (!updatedChallenge) {
          throw new Error("Challenge already finished");
        }
        const levelUp = await updateUserLevel(
          updatedChallenge.author._id,
          "personal"
        );
        return {
          challenges: [challenge],
          notifications: levelUp.notifications,
        };
      }
    },
    mapSystemChallengesToUser: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to see these challenges.");
      }

      let notifications = [];
      const systemDefinedChallenges = await SystemChallenges.find();
      const challengesCounter = await Challenges.find({
        author: context.user._id,
      }).count();
      const mappedChallenges = systemDefinedChallenges.map(challenge => {
        return {
          lookupId: challenge.lookupId,
          content: challenge.content,
          systemChallengeId: challenge._id,
          isSystemChallenge: true,
          author: context.user._id,
          createdAt: new Date(Date.now()),
        };
      });

      if (challengesCounter === 0) {
        await Challenges.insertMany(mappedChallenges, {
          upsert: true,
        });
        const currentUserChallenges = await Challenges.find({
          author: context.user._id,
        });

        await User.findByIdAndUpdate(
          context.user._id,
          {
            $push: {
              challenges: currentUserChallenges.filter(
                challenge => challenge._id
              ),
            },
          },
          { new: true, useFindAndModify: false }
        );
      }

      const currentUser = await User.findById(context.user._id).populate(
        "challenges"
      );

      if (currentUser.challenges) {
        await checkSystemChallenges(
          currentUser.questions,
          currentUser.challenges,
          context.user._id
        );
      }

      const systemChallengesNotifications = await Notification.find({
        type: "SYSTEM_CHALLENGE",
        user: context.user._id,
      });

      const challenges = await Challenges.find({ author: context.user._id });

      return {
        challenges: challenges,
        notifications: systemChallengesNotifications,
      };
    },
  },
};

export default challengesResolver;
