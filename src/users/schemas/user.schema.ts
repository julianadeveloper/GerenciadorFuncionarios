/* eslint-disable prettier/prettier */
import * as moongose from 'mongoose';

export const UserSchema = new moongose.Schema({
    name: String,
    occupation: String,

})