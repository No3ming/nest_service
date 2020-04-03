import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostUpdate, PostBody, PostList } from './interfaces/post.interface';
import { PostListInput } from './inputs/post.input';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }

    async create(createPostDto: PostBody): Promise<Post> {
        const postModel = new this.postModel(createPostDto);
        const result = await postModel.save()
        return await this.postModel.findById(result.id).populate('creator').populate('tag').exec();
    }

    async update(updatePostDto: PostUpdate): Promise<Post> {
        await this.postModel.updateOne({
            _id: updatePostDto.id,
            creator: updatePostDto.creator
        },
            {
                $set: {
                    ...updatePostDto
                }
            }).exec();
        return await this.postModel.findById(updatePostDto.id).populate('creator').populate('tag').exec()
    }

    async findOne(id: string): Promise<Post> {
        const post = await this.postModel.findOne({ _id: id, deletedAt: 0 }).populate('creator').populate('tag').exec()
        this.postModel.updateOne({_id: id}, {$set: {view: post.view + 1}}).exec()
        return post
    }

    async find({ title, limit = 30, offset = 0, tag}: PostListInput): Promise<PostList> {
        const ql = { title: new RegExp(title), deletedAt: 0, ...(tag ? {tag} : {}) }
        const query = this.postModel.find(ql)
        const list = await query.limit(limit).skip(offset * limit).populate('creator').populate('tag').sort('-createdAt').exec()
        const total = await query.count().exec()
        return {
            list,
            total
        }
    }

    async delete(id: string, userId: string): Promise<Post> {
        return await this.postModel.findOneAndUpdate({ _id: id, creator: userId }, { $set: { deletedAt: +new Date() } }).exec()
    }
}
