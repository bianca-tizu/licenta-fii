import { Question } from "../models/Question.model.js";
import { User } from "../models/User.model.js";

const questionResolver = {
  Query: {
    hello: () => {
      return "hello";
    },

    getAllQuestions: async (parent, args, context) => {
      const { offset, limit } = args;

      if (!context.user) {
        throw new Error("You're not allowed to get all questions");
      }
      const questions = await Question.find({ isDraft: false }).populate(
        "author"
      );

      if (limit) {
        return {
          questions: questions.reverse().slice(offset, offset + limit),
          questionsNo: questions.filter(question => !question.isDraft).length,
        };
      } else {
        return {
          questions: questions.reverse(),
          questionsNo: questions.filter(question => !question.isDraft).length,
        };
      }
    },

    getAllDraftsQuestions: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to get all questions");
      }

      return await Question.find({
        $and: [{ author: context.user._id }, { isDraft: true }],
      }).populate("author");
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
          { tags: { $regex: args.keyword.toLowerCase(), $options: "i" } },
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
        votes: 0,
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

    updateQuestion: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You're not allowed to view the questions");
      }

      const questionToBeUpdated = await Question.findById({
        _id: args.question.id,
      });

      if (args.question.title && args.question.isDraft) {
        args.question.title = "[Draft] " + args.question.title;
      }

      args.question.isDraft = args.question.isDraft ? true : false;

      Object.keys(args.question).forEach(value => {
        if (args.question[value] !== questionToBeUpdated[value]) {
          questionToBeUpdated[value] = args.question[value];
        }
      });

      const updatedQuestion = await Question.findByIdAndUpdate(
        { _id: args.question.id },
        { $set: questionToBeUpdated },
        { upsert: true, new: true }
      ).populate("author");

      return updatedQuestion;
    },
  },
};

export default questionResolver;
