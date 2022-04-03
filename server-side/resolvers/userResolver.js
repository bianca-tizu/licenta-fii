import argon2 from "argon2";
import jsonwebtoken from "jsonwebtoken";

import { User } from "../models/User.model.js";

import { gravatar } from "../assets/gravatar.js";
import dotenv from "dotenv";

dotenv.config();

const userResolver = {
  Query: {
    currentUser: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError("You are not authentificated");
      }
      const userData = await User.find({ _id: user._id });
      return userData;
    },
  },

  Mutation: {
    registerUser: async (parent, args, context, info) => {
      const { email, password, studentId } = args.user;

      const emailAddress = email.trim().toLowerCase();
      const username = await emailAddress.split("@")[0];
      const avatarUrl = gravatar(emailAddress);
      const hashedPassword = await argon2.hash(password);

      const userCheck = await User.findOne({
        $or: [
          {
            email: email,
          },
          {
            studentId: studentId,
          },
        ],
      });

      if (userCheck) {
        throw new ApolloError("User already exists");
      }

      const newUser = new User({
        email: emailAddress,
        password: hashedPassword,
        studentId: studentId,
        username: username,
        avatarUrl: avatarUrl,
      });
      await newUser.save();

      const token = jsonwebtoken.sign(
        { _id: newUser._id, email: newUser.emailAddress },
        process.env.JWT_SECRET,
        { expiresIn: "1y" }
      );

      return { user: newUser, token };
    },

    loginUser: async (parent, args) => {
      const { email, password } = args.user;

      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        throw new Error("No user with this email.");
      }

      const checkPassword = await argon2.verify(user.password, password);

      if (!checkPassword) {
        throw new Error("Invalid password");
      }

      const token = jsonwebtoken.sign(
        { _id: user._id, email: user.emailAddress },
        process.env.JWT_SECRET,
        { expiresIn: "1y" }
      );

      return { token, user };
    },
  },
};

export default userResolver;
