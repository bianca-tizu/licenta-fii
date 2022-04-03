import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import { User } from "../models/User.model.js";

import { gravatar } from "../assets/gravatar.js";
import dotenv from "dotenv";

dotenv.config();

const userResolver = {
  Query: {
    helloUser: (parent, args, { user }) => {
      if (!user) {
        throw new Error("You are not authentificated");
      }
      return "hello from user";
    },
  },

  Mutation: {
    registerUser: async (parent, args) => {
      const { email, password, studentId } = args.user;

      const emailAddress = email.trim().toLowerCase();
      const username = await emailAddress.split("@")[0];
      const avatarUrl = gravatar(emailAddress);
      const hashedPassword = await bcrypt.hash(password, 12);
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
        throw new Error("User already exists");
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
        { id: newUser.id, email: newUser.emailAddress },
        process.env.JWT_SECRET,
        { expiresIn: "1y" }
      );
      return { user: newUser, token };
    },

    loginUser: async (parent, args) => {
      const { email, password } = args.user;

      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        throw new Error("No user with email.");
      }

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        throw new Error("Invalid password");
      }

      const token = jsonwebtoken.sign(
        { id: user.id, email: user.emailAddress },
        process.env.JWT_SECRET,
        { expiresIn: "1y" }
      );

      return { token, user };
    },
  },
};

export default userResolver;
