import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Outline, OutlineUpdate, OutlineBody, OutlineList } from './interfaces/outline.interface';
import { OutlineListInput } from './inputs/outline.input';

@Injectable()
export class OutlineService {
    constructor(
        @InjectModel('Outline') private readonly outlineModel: Model<Outline>
        ) { }

    async create(createOutlineDto: OutlineBody): Promise<Outline> {
        const outlineModel = new this.outlineModel(createOutlineDto);
        const result = await outlineModel.save()
        return await this.outlineModel.findById(result.id).populate('creator').exec();
    }

    async update(updateOutlineDto: OutlineUpdate): Promise<Outline> {
        await this.outlineModel.updateOne({
            _id: updateOutlineDto.id,
            creator: updateOutlineDto.creator
        },
            {
                $set: {
                    title: updateOutlineDto.title,
                    post: updateOutlineDto.post,
                    updatedAt: updateOutlineDto.updatedAt
                }
            }).exec();
        return await this.outlineModel.findById(updateOutlineDto.id).populate('creator').exec()
    }

    async findOne(id: string, userId: string): Promise<Outline> {
        const outline = await this.outlineModel
        .findOne({ _id: id, deletedAt: 0, creator: userId })
        .populate('creator')
        .populate('tag')
        .exec()
        return outline
    }

    async find({ title, limit = 30, offset = 0, tag}: OutlineListInput, userId: string): Promise<OutlineList> {
        const ql = { title: new RegExp(title), deletedAt: 0, creator: userId, ...(tag ? {tag} : {})}
        const query = this.outlineModel.find(ql)
        const list = await query.limit(limit).skip(offset * limit)
        .populate('creator').populate('tag')
        .sort('-createdAt').exec()
        const total = await query.count().exec()
        return {
            list,
            total
        }
    }

    async delete(id: string, userId: string): Promise<string> {
        await this.outlineModel.findOneAndDelete({ _id: id, creator: userId }).exec()
        return id
    }

    async push (id: string, userId: string): Promise<string> {
        const res = await this.outlineModel.findOne({_id: id, creator: userId}).exec()
        
        return id
    }
}
