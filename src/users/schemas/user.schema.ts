/* eslint-disable prettier/prettier */
import mongoose, * as moongose from 'mongoose';
import { User } from '../shared/user';

export const UserSchema = new moongose.Schema({
    username: String,
    name: String,
    password: String,
    

})
export type UserDocument = User & mongoose.Document;