import { Question } from "../models/Question.model.js";

const questionResolver = {
  Query: {
    hello: () => {
      return "hello";
    },

    getAllQuestions: async () => {
      return await Question.find();
    },

    getQuestion: async (_parent, args, _context, _info) => {
      const { id } = args;
      return await Question.findById(id);
    },
  },

  Mutation: {
    createQuestion: async (parent, args, context, info) => {
      const { title, category, content, tags } = args.question;
      const question = new Question({ title, content, category, tags });
      await question.save();
      return question;
    },
  },
};

export default questionResolver;
