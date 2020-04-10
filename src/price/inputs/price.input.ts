import { InputType, Field } from "type-graphql";

@InputType()
export class PriceAdd {
    @Field()
    url: string;
}

@InputType()
export class PriceListInput {
    @Field({ nullable: true })
    tag?: string
    @Field({ nullable: true })
    limit?: number;
    @Field({ nullable: true })
    offset?: number;
}
