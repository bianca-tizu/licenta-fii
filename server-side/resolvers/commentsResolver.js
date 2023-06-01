import { Question } from "../models/Question.model.js";
import { User } from "../models/User.model.js";
import { Comment } from "../models/Comment.model.js";

import { checkSystemChallenges } from "../utils/checkSystemChallenges.js";

const commentsResolver = {
  Query: {
    getCommentsForQuestion: async (_, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to add a comment.");
      }
      const comments = await Comment.find({
        question: { _id: args.questionId },
      })
        .populate("author", ["avatarUrl", "username"])
        .populate("question", "_id");

      return comments.reverse();
    },
  },

  Mutation: {
    createComment: async (parent, args, context) => {
      let notifications = [];

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
      const author = await User.findById(context.user._id).populate(
        "challenges"
      );
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

      if (author.joinedRewardSystem && author.challenges.length > 0) {
        notifications = await checkSystemChallenges(
          [],
          author.challenges,
          context.user._id
        );
      }

      return {
        comment: {
          ...result._doc,
          author: { ...author._doc },
          question: { ...question._doc },
        },
        notifications: notifications ?? [],
      };
    },

    editComment: async (parent, args, context) => {
      const { id, message } = args.comment;
      const commentToUpdate = await Comment.findById(id);

      if (!context.user) {
        throw new Error("You're not allowed to delete a question.");
      }

      if (!commentToUpdate) {
        throw new Error("Server error");
      }

      commentToUpdate.message = message;
      const updatedComment = await commentToUpdate.save();

      return updatedComment;
    },

    deleteComment: async (parent, args, context) => {
      const commentToBeRemoved = await Comment.findById(args.id);

      if (!context.user) {
        throw new Error("You're not allowed to delete a question.");
      }

      await Comment.deleteOne(commentToBeRemoved);
      return commentToBeRemoved._id;
    },
  },
};

export default commentsResolver;
