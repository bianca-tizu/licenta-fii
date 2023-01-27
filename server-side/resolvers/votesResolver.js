import { Question } from "../models/Question.model.js";
import { Votes } from "../models/Votes.model.js";

const votesResolver = {
  Query: {
    isUserAlreadyVotedQuestion: async (_parent, { questionId }, { user }) => {
      if (!user) {
        throw new GraphQLError("You are not authentificated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      return await Votes.find({ userId: user._id, questionId: questionId });
    },
  },
  Mutation: {
    countVotesForQuestion: async (parent, args, context) => {
      const { questionId } = args;

      if (!context.user) {
        throw new Error("You're not allowed to vote this question");
      }

      const userAlreadyVoted = await Votes.find({
        $and: [{ questionId: questionId }, { userId: context.user._id }],
      });

      if (userAlreadyVoted.length > 0) {
        await Votes.findOneAndDelete({
          $and: [{ questionId: questionId }, { userId: context.user._id }],
        });
      } else {
        await Votes.create({
          questionId: questionId,
          userId: context.user._id,
        });
      }

      const numberOfVotes = await Votes.find({ questionId: questionId });
      await Question.findByIdAndUpdate(
        { _id: questionId },
        { $set: { votes: numberOfVotes.length } }
      );

      return numberOfVotes.length;
    },
  },
};

export default votesResolver;
