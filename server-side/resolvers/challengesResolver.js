import { Challenges } from "../models/Challenges.model.js";
import { User } from "../models/User.model.js";

const challengesResolver = {
  Query: {
    getSystemChallenges: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to see challenges.");
      }

      const challenges = await Challenges.find({
        isSystemChallenge: true,
        status: { $ne: "finished" },
      });

      return challenges;
    },
  },
  Mutation: {
    createChallenge: async (parent, args, context) => {
      const { title, content, isSystemChallenge } = args.challenge;
      if (!context.user) {
        throw new Error("You're not allowed to create a challenge.");
      }

      const challenge = new Challenges({
        title: title,
        content: content ?? "",
        status: "started",
        isSystemChallenge: isSystemChallenge,
        author: context.user._id,
        createdAt: new Date(Date.now()),
      });

      const result = await challenge.save();
      const author = await User.findById(context.user._id);
      console.log(author);
      if (!author) {
        throw new Error("User not found");
      }
      await User.findByIdAndUpdate(
        context.user._id,
        { $push: { rewardSystem: { challenges: result._id } } },
        { new: true, useFindAndModify: false }
      );

      return { ...result._doc, author: { ...author._doc } };
    },
  },
};

export default challengesResolver;
