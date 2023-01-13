import { Question } from "../models/Question.model.js";
import { User } from "../models/User.model.js";

const questionResolver = {
  Query: {
    hello: () => {
      return "hello";
    },

    getAllQuestions: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to get all questions");
      }
      const questions = await Question.find().populate("author");

      return questions.reverse();
    },

    getQuestion: async (parent, args, context) => {
      const { id } = args;

      if (!context.user) {
        throw new Error("You're not allowed to get all questions");
      }

      return await Question.findById(id).populate("author", "-_id");
    },

    searchQuestions: async (parent, args) => {
      const query = {
        $or: [
          { title: { $regex: args.keyword.toLowerCase() } },
          { content: { $regex: args.keyword.toLowerCase() } },
          { tags: { $regex: args.keyword.toLowerCase() } },
        ],
      };

      const searchResult = await Question.find({
        $and: [query, { isDraft: false }],
      }).populate("author", ["avatarUrl", "_id"]);

      return searchResult.reverse();
    },
  },

  Mutation: {
    createQuestion: async (parent, args, context) => {
      const { title, content, tags, isDraft } = args.question;

      if (!context.user) {
        throw new Error("You're not allowed to view the questions");
      }

      const question = new Question({
        title: isDraft ? `[Draft] ${title}` : title,
        content,
        tags,
        author: context.user._id,
        createdAt: new Date(Date.now()),
        isDraft: isDraft ? isDraft : false,
      });

      const result = await question.save();
      const author = await User.findById(context.user._id);
      if (!author) {
        throw new Error("User not found");
      }
      await User.findByIdAndUpdate(
        context.user._id,
        { $push: { questions: question._id } },
        { new: true, useFindAndModify: false }
      );

      return { ...result._doc, author: { ...author._doc } };
    },

    deleteQuestion: async (parent, args, context) => {
      const questionToBeRemoved = await Question.findOne({
        _id: args.id,
      });

      if (!context.user) {
        throw new Error("You're not allowed to delete a question.");
      }

      await Question.deleteOne(questionToBeRemoved);
      await User.findByIdAndUpdate(context.user._id, {
        $pull: { questions: args.id },
      });
      return questionToBeRemoved._id;
    },
  },
};

export default questionResolver;
