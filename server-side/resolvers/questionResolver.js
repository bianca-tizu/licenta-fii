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
  },

  Mutation: {
    createQuestion: async (parent, args, context) => {
      const { title, content, tags, isDraft } = args.question;
      console.log('Create question args: ',args);

      if (!context.user) {
        throw new Error("You're not allowed to view the questions");
      }

      const question = new Question({
        title: isDraft ? `[Draft] ${title}`: title,
        content,
        tags,
        author: context.user._id,
        createdAt: new Date(Date.now()),
        isDraft,
      });
      console.log("Create Question", question);
      console.log("context", context);

      const result = await question.save();
      const author = await User.findById(context.user._id);
      if (!author) {
        throw new Error("User not found");
      }
      await User.findByIdAndUpdate(
        context.user.id,
        { $push: { questions: question._id } },
        { new: true, useFindAndModify: false }
      );

      return { ...result._doc, author: { ...author._doc } };
    },
  },
};

export default questionResolver;
