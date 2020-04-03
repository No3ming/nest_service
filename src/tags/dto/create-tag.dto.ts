import { ObjectType, Field, ID } from 'type-graphql';
import { UserType } from 'src/users/dto/get-user.dto';

@ObjectType()
export class TagType {
  @Field(id => ID)
  readonly id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly createdAt: number;
  @Field()
  readonly updatedAt: number;
  @Field()
  readonly creator: UserType;
}

@ObjectType()
export class TagTypeList {
  @Field(type => [TagType])
  readonly list: TagType[];
  @Field()
  readonly total: number;
}