import * as mongoose from 'mongoose';

export const OutlinesSchema = new mongoose.Schema({
  title: String,
  tag: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' },
  post: String,
  view: Number,
  thumb: String,
  private: Boolean,
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  createdAt: Number,
  updatedAt: Number,
  deletedAt: Number,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
