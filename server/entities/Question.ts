import { Entity, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
@Entity()
export class Author {

  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}