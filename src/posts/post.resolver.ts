import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { PostsService } from './post.service';
import { PostAddInput, PostUpdateInput, PostListInput } from './inputs/post.input';
import { PostType, PostTypeList } from './dto/create-post.dto';
import { CurrentUser } from 'src/decorator/currentUser.decorator';
import { Post, PostUpdate, PostBody } from './interfaces/post.interface'
import { User } from 'src/users/interfaces/user.interface';

@Resolver('Post')
export class PostsResolver {
    constructor(private readonly postService: PostsService){}

    @Query(() => PostType)
    async findOnePost(@Args('id') id: string) {
        const result = await this.postService.findOne(id)
        return result
    }

    @Query(() => PostTypeList)
    async findPosts(@Args('input') input: PostListInput) {
        return this.postService.find(input)
    }

    @Mutation(() => PostType)
    @UseGuards(JwtGuard)
    async createPost(@Args('input') input: PostAddInput, @CurrentUser() user: User) {
        const post: PostBody = {
            post: input.post,
            tag: input.tag,
            title: input.title,
            createdAt: +new Date(),
            deletedAt: 0,
            updatedAt: 0,
            creator: user._id,
            view: 0,
            status: input.status
        }
        const result = await this.postService.create(post)
        return result
    }

    @Mutation(() => PostType)
    @UseGuards(JwtGuard)
    async updatePost(@Args('input') input: PostUpdateInput, @CurrentUser() user: User) {
        const post: PostUpdate = {
            id: input.id,
            tag: input.tag,
            post: input.post,
            title: input.title,
            updatedAt: +new Date(),
            deletedAt: 0,
            creator: user._id,
            status: input.status
        }
        const result = await this.postService.update(post)
        return result
    }

    @Mutation(() => PostType)
    @UseGuards(JwtGuard)
    async deletePost(@Args('id') id: string, @CurrentUser() user: User) {
        return await this.postService.delete(id, user._id)
    }
}
