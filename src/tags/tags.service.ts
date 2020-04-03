import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagUpdate, TagBody, TagList } from './interfaces/tag.interface';
import { TagListInput } from './inputs/tag.input';

@Injectable()
export class TagsService {
    constructor(@InjectModel('Tag') private readonly tagModel: Model<Tag>) {}

    async findOneTag(id: string): Promise<Tag> {
        return this.tagModel.findById(id).populate('creator').exec()
    }
    async findTags ({name, limit = 30, offset = 0 }: TagListInput): Promise<TagList> {
        const query = this.tagModel.find({ name: new RegExp(name), deletedAt: 0 })
        const list =  await query.limit(limit).skip(offset * limit).populate('creator').exec()
        const total = await query.count().exec()
        return {
            list,
            total
        }

    }
    async create(createPostDto: TagBody): Promise<Tag> {
        const postModel = new this.tagModel(createPostDto);
        const result = await postModel.save()
        return await this.tagModel.findById(result.id).populate('creator').exec();
    }
    async update(updateTagDto: TagUpdate): Promise<Tag> {
        const {ok } = await this.tagModel.updateOne({
            _id: updateTagDto.id,
            creator: updateTagDto.creator
        },
            {
                $set: {
                    name: updateTagDto.name,
                    updatedAt: updateTagDto.updatedAt
                }
            }).exec();
        return await this.tagModel.findById(updateTagDto.id).populate('creator').exec()
    }
    async delete(id: string, userId: string): Promise<string> {
        await this.tagModel.updateOne({ _id: id, creator: userId }, { $set: { deletedAt: +new Date() } }).exec()
        return id
    }
}
