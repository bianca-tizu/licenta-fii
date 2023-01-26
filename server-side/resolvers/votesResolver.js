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
      const { questionId, voted } = args.vote;

      if (!context.user) {
        throw new Error("You're not allowed to vote this question");
      }

      const userAlreadyVoted = await Votes.find({
        $and: [
          { questionId: questionId },
          { userId: context.user._id },
          { voted: true },
        ],
      });

      await Votes.findOneAndUpdate(
        { $and: [{ questionId: questionId }, { userId: context.user._id }] },
        { $set: { voted: voted, userId: context.user._id } },
        { upsert: true, new: true }
      );

      const questionVotes =
        (await Question.find({ questionId: questionId }).votes) ?? 0;

      if (userAlreadyVoted.length) {
        return Question.findByIdAndUpdate(
          {
            _id: questionId,
          },
          { $set: { votes: questionVotes < 1 ? 0 : questionVotes - 1 } }
        );
      } else {
        return Question.findByIdAndUpdate(
          {
            _id: questionId,
          },
          { $set: { votes: questionVotes + 1 } }
        );
      }
    },
  },
};

export default votesResolver;
