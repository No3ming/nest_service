import * as mongoose from 'mongoose';

export const TagsSchema = new mongoose.Schema({
  name: String,
  createdAt: Number,
  updatedAt: Number,
  deletedAt: Number,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});