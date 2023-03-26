import { Challenges } from "../models/Challenges.model.js";
import { Question } from "../models/Question.model.js";
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

      const systemDefinedChallenges = await SystemChallenges.find();
      const challengesCounter = await Challenges.find({
        author: context.user._id,
      }).count();
      const mappedChallenges = systemDefinedChallenges.map(challenge => {
        return {
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

        const currentUser = await User.findByIdAndUpdate(
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

        checkSystemChallenges(
          currentUser.questions,
          currentUser.challenges,
          context.user._id
        );
      }

      return await Challenges.find({ author: context.user._id });
    },
    checkAndUpdateSystemChallengesStatus: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to see these challenges.");
      }

      const currentUser = await User.findById(context.user._id).populate(
        "challenges"
      );
      const { questions, challenges } = currentUser;
      checkSystemChallenges(questions, challenges, context.user._id);
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
