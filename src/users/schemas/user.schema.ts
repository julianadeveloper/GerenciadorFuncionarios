/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, * as moongose from 'mongoose';
import { User } from '../shared/enitity/user';

export const UserSchema = new moongose.Schema({
  username: String,
  name: String,
  password: String,
  role: String,
  WebSocket: String,
});

export type UserDocument = User & mongoose.Document;

export const MyUserSchema = SchemaFactory.createForClass(User)