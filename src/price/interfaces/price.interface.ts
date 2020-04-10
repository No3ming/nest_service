import { Document } from 'mongoose';

export interface Tag {
    value: string;
    confidence: number;
}
export interface PriceBody {
    tags: string;
    img: string;
    confidence: number;
    createdAt?: number;
    updatedAt?: number;
    deletedAt?: number;
}
export interface Price extends Document, PriceBody {

}
export interface PriceUpdate extends PriceBody {
    id: string;
}
export interface PriceList {
    readonly list: Price[];
    readonly total: number;
}

