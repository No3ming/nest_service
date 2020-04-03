import * as mongoose from 'mongoose';

export const PostsSchema = new mongoose.Schema({
  title: String,
  tag: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' },
  post: String,
  view: Number,
  thumb: String,
  private: Boolean,
  status: Number,
  createdAt: Number,
  updatedAt: Number,
  deletedAt: Number,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
