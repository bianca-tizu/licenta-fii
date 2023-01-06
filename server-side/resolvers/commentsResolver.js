import { Question } from "../models/Question.model.js";
import { User } from "../models/User.model.js";
import { Comment } from "../models/Comment.model.js";

const commentsResolver = {
  Query: {
    getAllComments: async () => {},
  },

  Mutation: {
    createComment: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to add a comment.");
      }

      const comment = new Comment({
        message: args.comment.message,
        question: args.comment.questionId,
        createdAt: new Date(Date.now()),
        author: context.user._id,
      });

      const result = await comment.save();
      const author = await User.findById(context.user._id);
      const question = await Question.findById(args.comment.questionId);
      if (!author) {
        throw new Error("User not found");
      }

      if (!question) {
        throw new Error("Question not found");
      }
      await Question.findByIdAndUpdate(
        args.comment.questionId,
        { $push: { comments: args.comment._id } },
        { new: true, useFindAndModify: false }
      );

      return {
        ...result._doc,
        author: { ...author._doc },
        question: { ...question._doc },
      };
    },
  },
};

export default commentsResolver;
