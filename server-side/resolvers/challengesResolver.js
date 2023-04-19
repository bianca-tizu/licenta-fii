import { Challenges } from "../models/Challenges.model.js";
import { Question } from "../models/Question.model.js";
import { Notification } from "../models/Notification.model.js";
import { SystemChallenges } from "../models/SystemChallenges.model.js";
import { User } from "../models/User.model.js";

import { checkSystemChallenges } from "../utils/checkSystemChallenges.js";

const challengesResolver = {
  Query: {
    getSystemChallenges: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to see challenges.");
      }

      const challenges = await Challenges.find({
        isSystemChallenge: true,
      });

      return challenges;
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
    checkAndUpdateSystemChallengesStatus: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to see these challenges.");
      }

      try {
        const currentUser = await User.findById(context.user._id).populate(
          "challenges"
        );
        const { questions, challenges } = currentUser;
        const notifications = await checkSystemChallenges(
          questions,
          challenges,
          context.user._id
        );

        // if (notifications) {
        //   const test = currentUser.notifications.some(currentNotification => {
        //     notifications.find(
        //       notification => notification === currentNotification.message
        //     );
        //   });

        //   console.log(test);
        // }
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
  },
};

export default challengesResolver;
