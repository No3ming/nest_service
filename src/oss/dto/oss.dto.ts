import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class OssType {
  @Field()
  readonly url: string
}