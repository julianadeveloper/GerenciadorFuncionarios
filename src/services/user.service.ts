import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppGateway } from '../socket/socket.gateway';
import { Criptography } from '../users/shared/utils/bcrypt';
import { UserDocument } from '../users/schemas/user.schema';
import { createUser } from '../users/shared/dto/create-user.dto';
import { updateUser } from '../users/shared/dto/update-user.dto';
import { User } from '../users/shared/enitity/user';

@Injectable()
export class Userservice {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly socketGateway: AppGateway,
  ) {}

  async listUsers(pageFilter: any): Promise<User[]> {
    const query = {};
    if (pageFilter.search)
      query['name'] = { $regex: pageFilter.search, $options: 'i' };
    try {
      return await this.userModel.find(query, { password: 0 });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async listUserId(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id, { password: 0 });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async listUserGet(username: string): Promise<User> {
    try {
      return await this.userModel.findOne({ username: username }, {});
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async registerUser(user: createUser): Promise<createUser> {
    const userFound = await this.userModel.findOne({ username: user.username });
    if (userFound) {
      throw new BadRequestException('Usuario ja existe.');
    }

    user.password = await Criptography.encodePwd(user.password);

    const userCreate = await await this.userModel.create(user);
    this.socketGateway.emitnewUser(userCreate);

    return userCreate;
  }

  async changeUserCredentials(
    id: String,
    userUpdate: updateUser,
  ): Promise<updateUser> {
    if (userUpdate.password) {
      userUpdate.password = await Criptography.encodePwd(userUpdate.password);
    }

    try {
      const updated = await this.userModel
        .findByIdAndUpdate(id, userUpdate)
        .exec();

      this.socketGateway.emitupdateUser('id');
      console.log(userUpdate);

      return updated;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteUsers(ids: string[]) {
    Promise.all(
      ids.map(async (id) => {
        try {
          await this.userModel.findOneAndDelete({ _id: id }).exec();
        } catch (error) {
          throw new NotFoundException(error);
        }

        this.socketGateway.emitRemoveUser(id);
        console.log(id);
      }),
    );
  }
  //login
  async findOne(username: string): Promise<UserDocument | undefined> {
    try {
      return this.userModel.findOne({ username: username });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
