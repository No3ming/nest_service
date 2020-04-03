import { Module } from '@nestjs/common';
import { OutlineResolver } from './outline.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { OutlinesSchema } from './outline.schema'
import { OutlineService } from './outline.service';
import { PostModule } from 'src/posts/post.module';

@Module({
  imports: [PostModule, MongooseModule.forFeature([{ name: 'Outline', schema: OutlinesSchema }])],
  providers: [OutlineResolver, OutlineService]
})
export class OutlineModule {}
