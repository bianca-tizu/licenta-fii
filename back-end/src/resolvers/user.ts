import { gravatar } from "../gravatar";
import { User } from "../entities/User";
import { ContextType } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
  Root,
} from "type-graphql";
import argon2 from "argon2";

import { AuthenticationError } from "apollo-server-express";
import { getToken, getUserId } from "../util";
import { ObjectBindingPattern } from "@mikro-orm/core";

require("dotenv").config();
const jwt = require("jsonwebtoken");
@InputType()
class loginInput {
  @Field()
  email!: string;
  @Field()
  password!: string;
}

@ObjectType()
class LoginResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: false })
  token: String;
}

@Resolver()
export class UserResolver {
  //register query
  @Mutation(() => LoginResponse)
  async register(
    @Arg("input") input: loginInput,
    @Arg("studentId") studentId: string,
    @Ctx() ctx: ContextType
  ): Promise<LoginResponse> {
    if (input.email.length <= 2) {
      throw new AuthenticationError("E-mail too short");
    }

    if (input.password.length <= 5) {
      throw new AuthenticationError("Password's too short");
    }

    const hashedPassword = await argon2.hash(input.password);
    const username = await input.email.split("@")[0];
    const avatar = gravatar(input.email);

    try {
      const userExists = await ctx.em.findOne(User, { email: input.email });
      if (userExists) {
        throw new AuthenticationError("User Already Exists!");
      }
      await ctx.em.nativeInsert(User, {
        email: input.email,
        password: hashedPassword,
        studentId: studentId,
        username: username,
        avatar: avatar,
      });
      const user = await ctx.em.findOne(User, { email: input.email });
      if (!user) {
        throw new AuthenticationError("Error signing in");
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return { token };
    } catch (err) {
      console.log(err);
      throw new Error("Error creating account");
    }
  }

  //login query
  @Mutation(() => LoginResponse)
  async login(
    @Arg("input", () => loginInput) input: loginInput,
    @Ctx() ctx: ContextType
  ) {
    const user = await ctx.em.findOne(User, { email: input.email });
    if (!user) {
      throw new AuthenticationError("Error signing in");
    }
    const valid = await argon2.verify(user.password, input.password);
    if (!valid) {
      throw new AuthenticationError("Invalid Password!");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return { token };
  }

  //   //request reset password
  //   @Mutation(() => Boolean)
  //   async requestReset(@Arg("email") email: string, @Ctx() ctx: ContextType) {
  //     email = email.toLowerCase();

  //     //check if the user exists
  //     const user = await ctx.em.findOne(User, { email: email });
  //     if (!user) {
  //       throw new AuthenticationError("Error signing in");
  //     }
  //     //generate a token code for resetting that the user should receive it on the email and should enter it when he adds the new password
  //     const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  //     const mailResponse = await transport.sendMail({
  //       from: process.env.MAIL_SENDER,
  //       to: user.email,
  //       subject: "Y",
  //     });
  //   }
}
