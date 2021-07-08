import { Question } from './../entities/Question';

import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ContextType } from 'src/types';

@Resolver()
export class QuestionResolver {
  @Query(() => [Question])
  questions( @Ctx() ctx: ContextType): Promise<Question[]> {
    return ctx.em.find(Question, {});
  }

  @Query(() => Question, {nullable: true})
  question( 
    @Arg('id') id: string,
    @Ctx() ctx: ContextType): Promise<Question | null> {
    return ctx.em.findOne(Question, { id });
  }

  @Mutation(() => Question)
  async createQuestion( 
    @Arg('title') title: string,
    @Arg('category') category: string,
    @Arg('content') content: string,
    @Ctx() ctx: ContextType): Promise<Question> {
      let description = '';
      const sentences = content.match(/(^.*?[a-z]{2,}[.!?])\s+\W*[A-Z]/g);
      if (sentences!=null){
        description = sentences[0]; 
      }
      const question = ctx.em.create(Question, {title, description, content, category});
      await ctx.em.persistAndFlush(question);
      return question;
  }

  @Mutation(() => Question, {nullable: true})
  async updateQuestion( 
    @Arg('id') id: string,
    @Arg('title', () => String, {nullable: true}) title: string,
    @Ctx() ctx: ContextType): Promise<Question | null> {
      const question = await ctx.em.findOne(Question, {id});
      if (!question) {
        return null;
      }
      if (typeof title !== 'undefined') {
        question.title = title;
        await ctx.em.persistAndFlush(question);
      }
      return question;
  }

  @Mutation(() => Boolean)
  async deleteQuestion( 
    @Arg('id') id: string,
    @Ctx() ctx: ContextType): Promise<boolean> {
      await ctx.em.nativeDelete(Question, {id});
      return true;
  }
}