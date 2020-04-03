import { Document } from 'mongoose';

export interface TagBody {
  readonly name: string
  readonly createdAt?: number,
  readonly updatedAt?: number,
  readonly deletedAt?: number,
  readonly creator: string
}
export interface Tag extends Document {
  readonly name: string
  readonly createdAt?: number,
  readonly updatedAt?: number,
  readonly deletedAt?: number,
  readonly creator: string
}
export interface TagUpdate extends TagBody {
  readonly id: string
}

export interface TagList {
  readonly list: Tag[],
  readonly total: number
}