import { Entity, PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, ObjectType } from "type-graphql";

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
  @Property({ type: "text" })
  description!: string;

  @Field()
  @Property({ type: "number" })
  votes!: Number;

  // @Field()
  // @Property({ type: "text" })
  // tags!: [string];
}