import { Module } from '@nestjs/common';
import { PriceResolver } from './price.resolver';
import { PriceService } from './price.service';
import { ConfigModule } from 'src/config/config.module';
import {MongooseModule} from '@nestjs/mongoose';
import {PricesSchema} from './price.schema';

@Module({
  imports: [ConfigModule, MongooseModule.forFeature([{ name: 'Price', schema: PricesSchema }])],
  providers: [PriceResolver, PriceService]
})
export class PriceModule {}
