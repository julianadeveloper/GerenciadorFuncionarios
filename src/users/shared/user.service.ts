import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUser } from '../shared/dto/create-user.dto';
import { updateUser } from '../shared/dto/update-user.dto';
import { User } from '../shared/user';
import { UserDocument } from '../schemas/user.schema';
import { Criptography } from '.././shared/utils/bcrypt';

@Injectable()
export class Userservice {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async listUsers(pageFilter: any): Promise<User[]> {
    const query = {};
    if (pageFilter.search)
      query['username'] = { $regex: pageFilter.search, $options: 'i' };
    return await this.userModel.find(query).exec();
  }

  async listUserId( id: string) : Promise<User>{
    return await this.userModel.findById(id);
  }
  async listUserGet(username: string) {
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


  async changeUserCredentials(
    id: String,
    userUpdate: updateUser,
  ): Promise<updateUser> {
    userUpdate.password = await Criptography.encodePwd(userUpdate.password);
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

