import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { OutlineService } from './outline.service';
import { OutlineAddInput, OutlineUpdateInput, OutlineListInput, OutlinePush } from './inputs/outline.input';
import { OutlineType, OutlineTypeList } from './dto/create-outline.dto';
import { CurrentUser } from 'src/decorator/currentUser.decorator';
import { Outline, OutlineUpdate, OutlineBody } from './interfaces/outline.interface'
import { User } from 'src/users/interfaces/user.interface';
import { PostsService } from 'src/posts/post.service';
import { PostUpdate, PostBody, Post } from 'src/posts/interfaces/post.interface';

@Resolver('Outline')
export class OutlineResolver {
    constructor(private readonly outlineService: OutlineService, private readonly postsServicer: PostsService) { }

    @Query(() => OutlineType)
    @UseGuards(JwtGuard)
    async findOneOutline(@Args('id') id: string, @CurrentUser() user: User) {
        const result = await this.outlineService.findOne(id, user._id)
        return result
    }

    @Query(() => OutlineTypeList)
    @UseGuards(JwtGuard)
    async findOutlines(@Args('input') input: OutlineListInput, @CurrentUser() user: User) {
        return this.outlineService.find(input, user._id)
    }

    @Mutation(() => OutlineType)
    @UseGuards(JwtGuard)
    async createOutline(@Args('input') input: OutlineAddInput, @CurrentUser() user: User) {
        const Outline: OutlineBody = {
            post: input.post,
            postId: input.postId,
            tag: input.tag,
            title: input.title,
            createdAt: +new Date(),
            deletedAt: 0,
            updatedAt: 0,
            creator: user._id,
            private: input.private,
            thumb: input.thumb
        }
        const result = await this.outlineService.create(Outline)
        return result
    }

    @Mutation(() => OutlineType)
    @UseGuards(JwtGuard)
    async updateOutline(@Args('input') input: OutlineUpdateInput, @CurrentUser() user: User) {
        const Outline: OutlineUpdate = {
            id: input.id,
            tag: input.tag,
            post: input.post,
            postId: input.postId,
            title: input.title,
            updatedAt: +new Date(),
            deletedAt: 0,
            creator: user._id,
            private: input.private,
            thumb: input.thumb
        }
        const result = await this.outlineService.update(Outline)
        return result
    }

    @Mutation(() => OutlineType)
    @UseGuards(JwtGuard)
    async deleteOutline(@Args('id') id: string, @CurrentUser() user: User) {
        return await this.outlineService.delete(id, user._id)
    }
    
    @Mutation(() => String)
    @UseGuards(JwtGuard)
    async pushOutline(@Args() input: OutlinePush, @CurrentUser() user: User) {
        let outline
        let data
        if (input.input) {
            outline = input.input
            data = {
                tag: outline.tag,
                post: outline.post,
                title: outline.title,
                updatedAt: +new Date(),
                deletedAt: 0,
                creator: user._id,
                private: outline.private,
                thumb: outline.thumb
            }
        } else {
            outline = await this.outlineService.findOne(input.id, user._id)
            data = {
                tag: outline.tag.id,
                post: outline.post,
                title: outline.title,
                updatedAt: +new Date(),
                deletedAt: 0,
                creator: user._id,
                private: outline.private,
                thumb: outline.thumb
            }
        }
        if (!outline.id) {
            throw Error('找不到数据')
        }
        let result: Post
        if (outline.postId) {
            const postUpdate: PostUpdate = {
                id: outline.postId,
                status: 1,
                ...data
            }
            result =  await this.postsServicer.update(postUpdate)
        } else {
            const postAddInput: PostBody = {
                ...data,
                status: 1,
            }
            result =  await this.postsServicer.create(postAddInput)
        }
        if (result.id) {
            await this.outlineService.delete(input.id, user._id)
        } else {
            throw Error('出错了');
        }
        return result.id
    }
}

