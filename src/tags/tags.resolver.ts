import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import { TagType, TagTypeList } from './dto/create-tag.dto';
import { TagListInput, TagUpdateInput, TagAddInput } from './inputs/tag.input';
import { User } from 'src/users/interfaces/user.interface';
import { CurrentUser } from 'src/decorator/currentUser.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { TagUpdate, Tag, TagBody } from './interfaces/tag.interface';

@Resolver('Tags')
export class TagsResolver {
    constructor(private tagsService: TagsService) {}

    @Query(() => TagType)
    async findOneTag (@Args('id') id: string) {
        return this.tagsService.findOneTag(id)
    }
    @Query(() => TagTypeList)
    async findTags (@Args('input') input: TagListInput) {
        return this.tagsService.findTags(input)
    }

    @Mutation(() => TagType)
    @UseGuards(JwtGuard)
    async createTag(@Args('input') input: TagAddInput, @CurrentUser() user: User) {
        const tag: TagBody = {
            name: input.name,
            createdAt: +new Date(),
            deletedAt: 0,
            updatedAt: 0,
            creator: user._id
        }
        return await this.tagsService.create(tag)
    }

    @Mutation(() => TagType)
    @UseGuards(JwtGuard)
    async updateTag(@Args('input') input: TagUpdateInput, @CurrentUser() user: User) {
        const tag: TagUpdate = {
            id: input.id,
            name: input.name,
            updatedAt: +new Date(),
            deletedAt: 0,
            creator: user._id
        }
        return await this.tagsService.update(tag)
    }

    @Mutation(() => String)
    @UseGuards(JwtGuard)
    async deleteTag(@Args('id') id: string, @CurrentUser() user: User) {
        return await this.tagsService.delete(id, user._id)
    }
}
