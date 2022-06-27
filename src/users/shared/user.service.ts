import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUser } from '../shared/dto/create-user.dto';
import { updateUser } from '../shared/dto/update-user.dto';
import { User } from '../shared/user';
import { UserDocument } from '../schemas/user.schema';
import { Criptography } from '.././shared/utils/bcrypt';
import { AppGateway } from 'src/socket/socket-test.gateway';

@Injectable()
export class Userservice {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly socketGateway: AppGateway,
  ) {}

  async listUsers(pageFilter: any): Promise<User[]> {
    const query = {};
    if (pageFilter.search)
      query['username'] = { $regex: pageFilter.search, $options: 'i' };
    return await this.userModel.find(query, { password: 0 }).exec();
  }

  async listUserId(id: string): Promise<User> {
    return await this.userModel.findById(id, { password: 0 });
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
    
    this.socketGateway.emitnewUser(userCreate)

    return await userCreate.save();
  }

  async changeUserCredentials(
    id: String,
    userUpdate: updateUser,
  ): Promise<updateUser> {

  
    
    userUpdate.password = await Criptography.encodePwd(userUpdate.password);
    const updated =  await this.userModel
    .findByIdAndUpdate(id, userUpdate, { new: true },)
    .exec();
    
    this.socketGateway.emitupdateUser('id');
    return updated
  }

  async deleteUsers(ids: string[]) {
    Promise.all(
      ids.map(async (id) => {
        await this.userModel.findOneAndDelete({ _id: id }).exec();
        this.socketGateway.emitRemoveUser(id);
      }),
    );
  }
  //login

  async findOne(username: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ username: username });
  }
}
