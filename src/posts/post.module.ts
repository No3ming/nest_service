import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsSchema } from './post.schema'
import { PostsResolver } from './post.resolver';
import { PostsService } from './post.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostsSchema }])],
    providers: [PostsResolver, PostsService],
    exports: [PostsResolver, PostsService],
  })
export class PostModule {}
