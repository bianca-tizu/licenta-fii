import { gravatar } from "./../gravatar";
import { getToken } from "../util";
import { User } from "./../entities/User";
import { ContextType } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";

import { AuthenticationError } from "apollo-server-express";

const jwt = require("jsonwebtoken");

@InputType()
class loginInput {
  @Field()
  email!: string;
  @Field()
  password!: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class LoginResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

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
    const user = ctx.em.create(User, {
      email: input.email,
      password: hashedPassword,
      studentId: studentId,
      username: username,
      avatar: avatar,
    });

    try {
      const userExists = await ctx.em.findOne(User, { email: user.email });
      if (userExists) {
        throw new AuthenticationError("User Already Exists!");
      }
      // Creating a Token from User Payload obtained.
      const token = getToken(user);
      await ctx.em.persistAndFlush(
        ctx.em.create(User, { ...user, token: token })
      );
      return { token };
    } catch (err) {
      throw err;
    }
    //store user id session | set a cookie on the user | keep it logged
    // ctx.req.session.userId = user.id;
  }

  //login query
  @Mutation(() => LoginResponse)
  async login(
    @Arg("input", () => loginInput) input: loginInput,
    @Ctx() ctx: ContextType
  ) {
    const user = await ctx.em.findOne(User, { email: input.email });
    if (!user) {
      throw new AuthenticationError("No such user found!");
    }
    const valid = await argon2.verify(user.password, input.password);
    if (!valid) {
      throw new AuthenticationError("Invalid Password!");
    }

    const token = getToken(user);

    return token;
  }
}
