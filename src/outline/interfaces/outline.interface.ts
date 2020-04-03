import { Document } from 'mongoose';

export interface OutlineBody {
  tag: string;
  title: string;
  post: string;
  postId?: string,
  username?: string;
  createdAt?: number,
  updatedAt?: number,
  deletedAt?: number,
  creator: string,
  thumb?: string,
  private?: boolean,
}
export interface Outline extends Document, OutlineBody {

}
export interface OutlineUpdate extends OutlineBody {
  id: string
}
export interface OutlineList {
  readonly list: Outline[],
  readonly total: number
}
