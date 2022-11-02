import {
  UserInputError,
  ForbiddenError,
  AuthenticationError,
} from "apollo-server";
import jsonwebtoken from "jsonwebtoken";
import argon2 from "argon2";

import { User } from "../models/User.model.js";

import { gravatar } from "../assets/gravatar.js";

import { getResetPassToken } from "../utils/getResetPassToken.js";
import { sendEmail } from "../utils/sendEmail.js";

import dotenv from "dotenv";
import { Question } from "../models/Question.model.js";

dotenv.config();

const userResolver = {
  Query: {
    getCurrentUser: (_parent, _args, { user }) => {
      if (!user) {
        throw new AuthenticationError("You are not authentificated");
      }
      return User.find({ _id: user._id }).then(res => res[0]);
    },
  },

  Mutation: {
    registerUser: async (_parent, args, _context, _info) => {
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
        throw new ForbiddenError("User already exists");
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
        { expiresIn: 86400 }
      );

      return { user: newUser, token };
    },

    loginUser: async (_parent, args) => {
      const { email, password } = args.user;

      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        throw new UserInputError("No user with this email.");
      }

      const checkPassword = await argon2.verify(user.password, password);

      if (!checkPassword) {
        throw new UserInputError("Invalid password");
      }

      const token = jsonwebtoken.sign(
        { _id: user._id, email: user.emailAddress },
        process.env.JWT_SECRET,
        { expiresIn: 14400 }
      );

      return { token, user };
    },

    updateUser: async (_parent, args, { user }) => {
      const hashedPassword = await argon2.hash(args.user.password);

      const userToUpdate = await User.findOne({ where: { _id: user._id } });
      Object.keys(args.user).forEach(value => {
        if (args.user[value] === userToUpdate[value]) {
          const capitalizeValue =
            value.charAt(0).toUpperCase() + value.slice(1);
          throw new Error(
            `${capitalizeValue} ${args.user[value]} already in use`
          );
        }
        if (args.user[value] !== "") {
          if (value === "password") {
            userToUpdate[value] = hashedPassword;
          } else {
            userToUpdate[value] = args.user[value];
          }
        }
      });

      const updatedUser = await userToUpdate.save();
      return updatedUser;
    },

    forgetPassword: async (_parent, args) => {
      const { resetPassToken, resetPassExpire } = getResetPassToken();
      const { email } = args;

      const user = await User.findOne({ email: email });
      if (!user) {
        throw new UserInputError("No user with this email.");
      }

      const userToUpdate = await User.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            resetPassToken: resetPassToken,
            resetPassExpire: resetPassExpire,
          },
        }
      );

      const updatedUser = await userToUpdate.save();

      try {
        await sendEmail({
          email: updatedUser.email,
          subject: "Password reset token",
          message:
            "You are receiving this email because you (or someone else) has requested the reset of a password." +
            "Follow this link: localhost:8000/reset/" +
            resetPassToken +
            " and you'll manage to reset the password.",
        });
        return updatedUser;
      } catch (err) {
        const userToUpdate = await User.findOneAndUpdate(
          { email: email },
          {
            $set: {
              resetPassToken: undefined,
              resetPassExpire: undefined,
            },
          }
        );

        await userToUpdate.save();
        throw new Error("Email could not be sent");
      }
    },

    removeUser: async (parent, args, { user }) => {
      const userToBeRemoved = await User.findOne({ _id: user._id });
      const draftsToBeRemoved = await Question.find({
        author: user._id,
        isDraft: true,
      });

      if (!userToBeRemoved) {
        throw new UserInputError("No user with this email.");
      }

      if (draftsToBeRemoved) {
        draftsToBeRemoved.forEach(
          async draft => await Question.deleteMany(draft)
        );
      }
      await User.deleteOne(userToBeRemoved);
      return userToBeRemoved._id;
    },
  },
};

export default userResolver;
