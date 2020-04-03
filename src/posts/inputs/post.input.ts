import { InputType, Field, ID} from 'type-graphql';

@InputType()
export class PostAddInput {
    @Field()
    tag: string;
    @Field()
    title: string;
    @Field()
    post: string;
    @Field({ nullable: true })
    thumb?: string;
    @Field({ nullable: true })
    private?: boolean;
    @Field()
    status: number;
}
@InputType()
export class PostUpdateInput extends PostAddInput {
    @Field(id => ID)
    id: string;
}

@InputType()
export class PostListInput {
    @Field({ nullable: true })
    tag?: string
    @Field({ nullable: true })
    title?: string;
    @Field({ nullable: true })
    limit?: number;
    @Field({ nullable: true })
    offset?: number;
}
