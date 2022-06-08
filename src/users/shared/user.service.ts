import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUser } from '../shared/dto/create-user.dto';
import { getUser } from '../shared/dto/get-user.dto';
import { updateUser } from '../shared/dto/update-user.dto';
import { User } from '../shared/user';
import { UserDocument } from '../schemas/user.schema';
import { Criptography } from '.././shared/utils/bcrypt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Userservice {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async listUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async listUserId(username: string) {
    return await this.userModel.findOne({ username: username }, {});
  }

  async registerNewUser(user: createUser): Promise<createUser> {
    const userFound = await this.userModel.findOne({ username: user.username });
    if (userFound) {
      throw new BadRequestException('Usuario ja existe.');
    }
    user.password = await Criptography.encodePwd(user.password);

    const userCreate = new this.userModel(user);
    return await userCreate.save();
  }
  userpassword(userpassword: any, arg1: number) {
    throw new Error('Method not implemented.');
  }

  async changeUserCredentials(
    id: String,
    userUpdate: updateUser,
  ): Promise<updateUser> {
    return this.userModel
      .findByIdAndUpdate(id, userUpdate, { new: true })
      .exec();
  }

  async deleteUsers(ids: string[]) {
    Promise.all(
      ids.map(async (id) => {
        await this.userModel.findOneAndDelete({ _id: id }).exec();
      }),
    ); 
  }
  //login

  async findOne(username: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ username: username });
  }
}
function _id(_id: any) {
  throw new Error('Function not implemented.');
}
