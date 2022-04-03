import { Question } from "../models/Question.model.js";
import { User } from "../models/User.model.js";

const questionResolver = {
  Query: {
    hello: () => {
      return "hello";
    },

    getAllQuestions: async (context) => {
      if (!context.user) {
        throw new Error("You're not allowed to get all questions");
      }
      return await Question.find();
    },

    getQuestion: async (_parent, args, _context) => {
      const { id } = args;
      return await Question.findById(id).populate("author");
    },
  },

  Mutation: {
    createQuestion: async (parent, args, context) => {
      const { title, category, content, tags } = args.question;

      if (!context.user) {
        throw new Error("You're not allowed to get all questions");
      }

      const question = new Question({
        title,
        content,
        category,
        tags,
        author: context.user.id,
        createdAt: Date.now(),
      });

      await Question.create(question);
      await User.findByIdAndUpdate(
        context.user.id,
        { $push: { questions: question._id } },
        { new: true, useFindAndModify: false }
      );

      return question;
    },
  },
};

export default questionResolver;
