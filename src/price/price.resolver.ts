import {Resolver, Query, Args, Mutation} from '@nestjs/graphql';
import { PriceService } from './price.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import {PriceTagBody, PriceType} from './dto/price.dto';
import {PriceListInput} from './inputs/price.input';

@Resolver('Price')
export class PriceResolver {
    constructor(private readonly priceService: PriceService) {}

    @Mutation(() => PriceTagBody)
    @UseGuards(JwtGuard)
    async addPrices(@Args('url') url: string) {
        return this.priceService.addPrices(url);
    }

    @Query(() => PriceType)
    @UseGuards(JwtGuard)
    async getPrices(@Args('input') input: PriceListInput) {
        return this.priceService.find(input);
    }

}
