import { ObjectType, Field, ID } from 'type-graphql';
import { UserType } from 'src/users/dto/get-user.dto';
import { TagType } from 'src/tags/dto/create-tag.dto';

@ObjectType()
export class OutlineType {
  @Field(id => ID)
  readonly id: string;
  @Field()
  readonly tag: TagType;
  @Field()
  readonly title: string;
  @Field()
  readonly post: string;
  @Field({ nullable: true })
  readonly postId: string;
  @Field()
  readonly createdAt: number
  @Field()
  readonly updatedAt: number
  @Field()
  readonly creator: UserType
  @Field({ nullable: true })
  readonly view: number
  @Field({ nullable: true })
  thumb?: string;
  @Field({ nullable: true })
  private?: boolean;
}

@ObjectType()
export class OutlineTypeList {
  @Field(type => [OutlineType])
  readonly list: OutlineType[];
  @Field()
  readonly total: number;
}
