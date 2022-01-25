import {
  ArrayType,
  Entity,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Question {
  @Field(() => String)
  @PrimaryKey()
  _id!: ObjectId;

  @Field(() => String)
  @SerializedPrimaryKey()
  id!: string;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field(() => User)
  @ManyToOne(() => User, { mapToPk: true, wrappedReference: true })
  author!: User;

  @Field()
  @Property({ type: "text" })
  title!: string;

  @Field()
  @Property({ type: "text" })
  category!: string;

  @Field()
  @Property({ type: "text" })
  content!: string;

  @Field()
  @Property({ type: "number", nullable: true })
  votes?: Number;

  @Field((type) => [String])
  @Property({ type: ArrayType, nullable: true })
  tags!: string[];
}
