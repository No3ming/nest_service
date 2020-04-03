import { InputType, Field, ID, ArgsType} from 'type-graphql';

@InputType()
export class OutlineAddInput {
    @Field()
    tag: string;
    @Field()
    title: string;
    @Field()
    post: string;;
    @Field({ nullable: true })
    postId?: string
    @Field({ nullable: true })
    thumb?: string;
    @Field({ nullable: true })
    private?: boolean;
}
@InputType()
export class OutlineUpdateInput extends OutlineAddInput {
    @Field(id => ID)
    id: string;
}

@InputType()
export class OutlineListInput {
    @Field({ nullable: true })
    tag?: string
    @Field({ nullable: true })
    title?: string;
    @Field({ nullable: true })
    limit?: number;
    @Field({ nullable: true })
    offset?: number;
}

@ArgsType()
export class OutlinePush {
    @Field()
    id: string;
    @Field({ nullable: true })
    input?: OutlineUpdateInput
}