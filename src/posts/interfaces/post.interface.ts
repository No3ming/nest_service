import { Document } from 'mongoose';

export interface PostBody {
  tag: string;
  title: string;
  post: string;
  username?: string;
  createdAt?: number,
  updatedAt?: number,
  deletedAt?: number,
  creator: string,
  view?: number,
  thumb?: string,
  private?: boolean,
  status: number
}
export interface Post extends Document, PostBody {

}
export interface PostUpdate extends PostBody {
  id: string
}
export interface PostList {
  readonly list: Post[],
  readonly total: number
}
