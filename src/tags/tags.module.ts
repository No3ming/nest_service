import { Module } from '@nestjs/common';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';
import { TagsSchema } from './tags.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tag', schema: TagsSchema }])],
  providers: [TagsResolver, TagsService]
})
export class TagsModule {}
