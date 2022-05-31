import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUser } from './dto/create-user.dto';
import { getUserId } from './dto/get-user.dto';
import { updateUser } from './dto/update-user.dto';
import { User } from './user';
import { UserDocument } from '../schemas/user.schema';


@Injectable()
export class Userservice {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async listUsers(): Promise<User[]> {
      return await this.userModel.find().exec();
  }

  async searchUsername(username: string): Promise<User> {
    return await this.userModel.findOne({username});
  }

  

  async registerNewUser(user: createUser): Promise<createUser> {
   const userFound =  await this.userModel.findOne({username:user.username});
    if ( userFound){
      throw new BadRequestException('Usuario ja existe.');  
    }
    const userCreate = new this.userModel(user);


    return await userCreate.save();
  }

  async listUserId(id: string): Promise<getUserId> {
    return this.userModel.findById(id).exec();
  }


  async changeUserCredentials(id: String, userUpdate: updateUser): Promise<updateUser> {
    return this.userModel.findByIdAndUpdate(id, userUpdate, { new: true }).exec();
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
    return this.userModel.findOne({username : username});
  }


}
function _id(_id: any) {
  throw new Error('Function not implemented.');
}

