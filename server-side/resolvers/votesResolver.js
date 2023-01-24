import { Question } from "../models/Question.model.js";
import { Votes } from "../models/Votes.model.js";

const votesResolver = {
  Query: {},
  Mutation: {
    countVotesForQuestion: async (parent, args, context) => {
      const { questionId, voteNumber } = args.vote;

      if (!context.user) {
        throw new Error("You're not allowed to vote this question");
      }

      const userAlreadyVoted = await Votes.find({
        $and: [{ questionId: questionId }, { userId: context.user }],
      });
      console.log("userAlreadyVoted", userAlreadyVoted);

      if (userAlreadyVoted.length > 0) {
        throw new Error("You already voted this question");
      }

      await Votes.findOneAndUpdate(
        { questionId: questionId },
        { $set: { votes: voteNumber, userId: context.user._id } },
        { upsert: true, new: true }
      );

      const updateVotedQuestion = await Question.findByIdAndUpdate(
        {
          _id: questionId,
        },
        { $set: { votes: voteNumber } }
      );
      console.log("updateVotedQuestion", updateVotedQuestion);

      //cauta daca exista record pentru questionId cu acelasi userId
      //   => daca da, returneaza eroare ca a mai votat o data
      //   => altfel cauta daca exista record pentru questionId
      //             => daca da, fa update
      //             => altfel, creaza un record nou

      return updateVotedQuestion;
    },
  },
};

export default votesResolver;
