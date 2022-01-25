import { Question } from "./../entities/Question";

import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ContextType } from "../types";
import { CreateQuestionInput } from "./inputs/createQuestionInput";
import { User } from "../entities/User";
// import { ObjectId } from "@mikro-orm/mongodb";
import { ObjectId } from "mongodb";
import { wrap } from "@mikro-orm/core";
@Resolver()
export class QuestionResolver {
  @Query(() => [Question])
  async questions(@Ctx() ctx: ContextType): Promise<Question[]> {
    const questions = await ctx.em.find(Question, {});
    console.log("--------------------------------------");
    console.log("ALL QUESTIONS: ", questions);
    return questions;
  }

  // @Query(() => Question, { nullable: true })
  // question(
  //   @Arg("id") id: string,
  //   @Ctx() ctx: ContextType
  // ): Promise<Question | null> {
  //   return ctx.em.findOne(Question, { id });
  // }

  @Mutation(() => Question)
  async createQuestion(
    @Arg("questionDetails") newQuestionDetails: CreateQuestionInput,
    @Ctx() ctx: ContextType
  ): Promise<Question> {
    const author = new ObjectId(ctx.userId);
    const authorData = await ctx.em.findOne(User, { _id: author });

    const votes = 0;
    const { title, content, category, tags } = newQuestionDetails;

    const question = ctx.em.create(Question, {
      title,
      content,
      category,
      author: authorData,
      votes,
      tags,
    });
    await ctx.em.persistAndFlush(question);
    return question;
  }

  @Mutation(() => Question, { nullable: true })
  async updateQuestion(
    @Arg("question", () => String, { nullable: true }) question: Question,
    @Ctx() ctx: ContextType
  ): Promise<Question | null> {
    const existentQuestion = await ctx.em.findOne(Question, {});
    if (!existentQuestion) {
      return null;
    }
    if (typeof question.title !== "undefined") {
      existentQuestion.title = question.title;
      await ctx.em.persistAndFlush(existentQuestion);
    }
    return question;
  }

  @Mutation(() => Question, { nullable: true })
  async countVotes(@Arg("id") id: string, @Ctx() ctx: ContextType) {
    const question = await ctx.em.findOne(Question, { id: id });
    if (!question) {
      return null;
    }
    if (question.votes) {
      let currentVotes = Number(question.votes);
      currentVotes++;
      question.votes = currentVotes;
      await ctx.em.persistAndFlush(question);
    }

    return question;
  }

  @Mutation(() => Boolean)
  async deleteQuestion(
    @Arg("id") id: string,
    @Ctx() ctx: ContextType
  ): Promise<boolean> {
    await ctx.em.nativeDelete(Question, { id: id });
    return true;
  }
}
