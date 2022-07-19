import { UsersController } from './users.controller';
import { Userservice } from '../users/shared/services/user.service';
import { AppGateway } from 'src/socket/socket-test.gateway';
import { Model } from 'mongoose';
import { User } from './shared/enitity/user';
import { Test, TestingModule, } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

describe('UserController', () => {
  let usersController: UsersController;
  let usersService: Userservice;
  let userRepository: Model<User>;
  let socketGatway : AppGateway;

  beforeEach(async () => {
    // usersService = new Userservice(userRepository, socketGatway);
    // usersController = new UsersController(usersService)


    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        Userservice,
        AppGateway,
      //   {
      //   provide: getModelToken('User'),
      // }
      ],
      
      })
    }).compile();
    // usersController = await ModuleRef.resolve(usersController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
        console.log('lalala')
    });
  });
