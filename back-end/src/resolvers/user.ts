import { getToken } from '../util';
import { User } from './../entities/User';
import { ContextType } from 'src/types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import argon2 from 'argon2';

import { AuthenticationError } from 'apollo-server-express';

@InputType()
class loginInput{
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
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[];

  @Field(() => User, {nullable: true})
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, {nullable: true})
  async isUserLogged(
    @Ctx() ctx: any
  ){
    // user not logged
    if (!ctx.req.loggedIn) {
      throw new AuthenticationError("Please Login Again!")
    }

    return ctx.user;
  }
  
  //register query
  @Mutation(() => LoginResponse)
  async register(
    @Arg('input') input: loginInput,
    @Arg('studentId') studentId: string,
    @Ctx() ctx: ContextType
  ): Promise<LoginResponse>  {
    if (input.email.length <= 2) {
      throw new AuthenticationError("E-mail too short")
    }

    if (input.password.length <= 5) {
      throw new AuthenticationError("Password's too short")
    }

    const hashedPassword = await argon2.hash(input.password)
    const username = await input.email.split("@")[0];
    const user = ctx.em.create(User, {email: input.email, password: hashedPassword, studentId: studentId, username: username})
    try {
      const userExists = await ctx.em.findOne(User, {email: user.email})
      if (userExists) {
        throw new AuthenticationError("User Already Exists!")
      }
      // Creating a Token from User Payload obtained.
      const token = getToken(user);
      await ctx.em.persistAndFlush(ctx.em.create(User, {...user, token: token}));
      return {user};

    } catch(err) {
      throw err;
    }
    //store user id session | set a cookie on the user | keep it logged
    // ctx.req.session.userId = user.id;

  }

  //login query
  @Mutation(() => LoginResponse)
  async login(
    @Arg('input', () => loginInput) input: loginInput,
    @Ctx() ctx: ContextType
  ){
    const user = await ctx.em.findOne(User, {email: input.email})
    if (!user) {
      throw new AuthenticationError("Wrong e-mail!")
    };
    const valid = await argon2.verify(user.password, input.password);
    if (!valid){
      throw new AuthenticationError("Wrong Password!")
    }
    const token = getToken(user);
    // ctx.req.session.userId = user.id;
    
    return {
      ...user
    };
  }
}