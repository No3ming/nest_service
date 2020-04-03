import { ObjectType, Field, Int, ID } from 'type-graphql';

@ObjectType()
export class AuthType {
  @Field()
  readonly access_token: string;
}