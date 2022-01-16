import { Question } from "src/entities/Question";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateQuestionInput implements Partial<Question> {
  @Field()
  title: string;

  @Field()
  category: string;

  @Field()
  content: string;

  @Field((type) => [String])
  tags: string[];
}
