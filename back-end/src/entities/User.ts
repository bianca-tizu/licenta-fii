import {
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, ObjectType } from "type-graphql";
import { Question } from "./Question";

@ObjectType()
@Entity()
export class User {
  @Field(() => String)
  @PrimaryKey({ unique: true })
  _id!: ObjectId;

  @Field(() => String)
  @SerializedPrimaryKey({ unique: true })
  id!: string;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "string", unique: true })
  email!: string;

  @Field(() => String)
  @Property({ type: "text", unique: true })
  username: string;

  @Property({ type: "text", unique: true })
  password!: string;

  @Field(() => String)
  @Property({ type: "string", unique: true })
  studentId!: string;

  @Field(() => String)
  @Property({ type: "string", unique: true })
  session!: string;

  @Field(() => String)
  @Property({ type: "string", unique: true })
  token: string;

  @Field(() => String)
  @Property({ type: "string" })
  avatar: string;

  @OneToMany(() => Question, (question) => question.author)
  questions: Question[];
}
