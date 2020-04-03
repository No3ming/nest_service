import { InputType, Field, ID} from 'type-graphql';

@InputType()
export class TagAddInput {
    @Field()
    name: string;
}
@InputType()
export class TagUpdateInput extends TagAddInput {
    @Field(id => ID)
    id: string;
}

@InputType()
export class TagListInput {
    @Field()
    name: string;
    @Field()
    limit?: number;
    @Field()
    offset?: number;
}