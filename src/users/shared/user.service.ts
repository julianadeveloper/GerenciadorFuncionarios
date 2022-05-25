import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user';

@Injectable()
export class Userservice {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async listUsers(): Promise<User[]> {
      return await this.userModel.find().exec();
      throw   'Não foi possível listar usuário.'
    
  }

  async registerNewUser(user: User): Promise<User> {
    const userCreate = new this.userModel(user);
    return await userCreate.save();
  }

  async listUserId(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async changeUserCredentials(id: String, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }
  async deleteUsers(ids: string[]) {
    Promise.all(
      ids.map(async (id) => {
        await this.userModel.findOneAndDelete({ _id: id }).exec();
      }),
    );
  }
}
