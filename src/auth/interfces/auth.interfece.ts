import { Document } from 'mongoose';

export interface Auth extends Document {
  readonly uername: string;
  readonly password: string;
}