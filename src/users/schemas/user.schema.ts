/* eslint-disable prettier/prettier */
import mongoose, * as moongose from 'mongoose';
import { User } from '../shared/user';

export const UserSchema = new moongose.Schema({
    username: String,
    name: String,
    password: String,
    role: String,
    WebSocket: String,

})
export type UserDocument = User & mongoose.Document;