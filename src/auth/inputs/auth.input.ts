import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class AuthInput {
  @Field()
  readonly username: string;
  @Field()
  readonly password: string;
}