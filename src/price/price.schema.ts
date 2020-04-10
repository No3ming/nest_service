import * as mongoose from 'mongoose';

export const PricesSchema = new mongoose.Schema({
  tags: String,
  img: String,
  createdAt: Number,
  deletedAt: Number,
});
