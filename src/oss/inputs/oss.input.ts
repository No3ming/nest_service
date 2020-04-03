import { InputType, Field } from "type-graphql";

@InputType()
export class OssPut {
    @Field()
    name: string;
    @Field()
    style: string;
}