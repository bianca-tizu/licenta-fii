import { User } from "../models/User.model.js";

import { gravatar } from "../assets/gravatar.js";

const userResolver = {
  Query: {
    helloUser: () => {
      return "hello from user";
    },
  },

  Mutation: {
    registerUser: async (parent, args, context, info) => {
      const { email, password, studentId } = args.user;
      const username = await email.split("@")[0];
      const avatarUrl = gravatar(email);

      const newUser = new User({
        email,
        password,
        studentId,
        username,
        avatarUrl,
      });
      await newUser.save();
      return newUser;
    },
  },
};

export default userResolver;
