import { Question } from "./../entities/Question";

import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { ContextType } from "../types";
import { CreateQuestionInput } from "./inputs/createQuestionInput";
import { User } from "../entities/User";
import { getUserId } from "../util";

@Resolver()
export class QuestionResolver {
  // @FieldResolver(() => User)
  // async currentUser(@Ctx() ctx: ContextType): Promise<any> {
  //   if (!ctx.req.token) {
  //     return null;
  //   }
  //   const userId = getUserId(ctx.req.token);
  //   const currentUser = await ctx.em.findOne(User, { id: userId });
  //   console.log(ctx.req.token);
  //   return currentUser;
  // }

  @Query(() => [Question])
  questions(@Ctx() ctx: ContextType): Promise<Question[]> {
    return ctx.em.find(Question, {});
  }

  @Query(() => Question, { nullable: true })
  question(
    @Arg("id") id: string,
    @Ctx() ctx: ContextType
  ): Promise<Question | null> {
    return ctx.em.findOne(Question, { id });
  }

  @Mutation(() => Question)
  async createQuestion(
    @Arg("questionDetails") newQuestionDetails: CreateQuestionInput,
    @Ctx() ctx: ContextType
  ): Promise<Question> {
    let description = "";
    const author = ctx.userId;
    const votes = 0;
    const { title, content, category, tags } = newQuestionDetails;

    const sentences = content.match(/(^.*?[a-z]{2,}[.!?])\s+\W*[A-Z]/g);
    if (sentences != null) {
      description = sentences[0];
    }
    const question = ctx.em.create(Question, {
      title,
      description,
      content,
      category,
      author,
      votes,
      tags,
    });
    await ctx.em.persistAndFlush(question);
    return question;
  }

  @Mutation(() => Question, { nullable: true })
  async updateQuestion(
    @Arg("id") id: string,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() ctx: ContextType
  ): Promise<Question | null> {
    const question = await ctx.em.findOne(Question, { id });
    if (!question) {
      return null;
    }
    if (typeof title !== "undefined") {
      question.title = title;
      await ctx.em.persistAndFlush(question);
    }
    return question;
  }

  @Mutation(() => Boolean)
  async deleteQuestion(
    @Arg("id") id: string,
    @Ctx() ctx: ContextType
  ): Promise<boolean> {
    await ctx.em.nativeDelete(Question, { id });
    return true;
  }
}
