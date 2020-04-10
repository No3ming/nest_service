import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class PriceTag {
  @Field()
  value: string
  @Field()
  confidence: number
}

@ObjectType()
export class PriceTagBody {
  @Field()
  tags: string
  @Field()
  img: string
}

@ObjectType()
export class PriceType {
  @Field(type => [PriceTagBody])
  list: PriceTagBody
  @Field()
  total: number
}
