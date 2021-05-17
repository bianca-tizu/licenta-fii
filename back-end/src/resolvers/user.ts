import { User } from './../entities/User';
import { ContextType } from 'src/types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import argon2 from 'argon2';

@InputType()
class loginInput{
  @Field()
  email: string
  @Field()
  password: string
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
  //register query
  @Mutation(() => LoginResponse)
  async register(
    @Arg('input') input: loginInput,
    @Arg('studentId') studentId: string,
    @Ctx() ctx: ContextType
  ): Promise<LoginResponse>  {
    if (input.email.length <= 2) {
      return {
        errors: [{
          field: 'email',
          message: 'Length must be grater than 2'
        }]
      }
    }

    if (input.password.length <= 5) {
      return {
        errors: [{
          field: 'password',
          message: 'Length must be grater than 5'
        }]
      }
    }
    const hashedPassword = await argon2.hash(input.password)
    const username = await input.email.split("@")[0];
    const user = ctx.em.create(User, {email: input.email, password: hashedPassword, studentId: studentId, username: username})
    try {
      await ctx.em.persistAndFlush(user);
    } catch(err) {
      console.log("message: ", err)
    }
    return {user};
  }

  //login query
  @Mutation(() => LoginResponse)
  async login(
    @Arg('input', () => loginInput) input: loginInput,
    @Ctx() ctx: ContextType
  ): Promise<LoginResponse> {
    const user = await ctx.em.findOneOrFail(User, {email: input.email})
    if (!user) {
      return {
        errors: [{
          field: 'email',
          message: 'that e-mail doesn\'t exist'
        }]
      }
    };
    const valid = await argon2.verify(user.password, input.password);
    if (!valid){
      return {
        errors: [{
          field: 'password',
          message: 'Incorrect password'
        }]
      }
    }
    
    return {
      user,
    };
  }
}