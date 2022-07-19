import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Server, ServerOptions, Socket } from 'socket.io';
import { AppGateway } from '../../socket/socket-test.gateway';
import { User } from './user';
import { Userservice } from './user.service';
import { Criptography } from './utils/bcrypt';

const userEntityList: User[] = [
  new User({
    _id: '89d58w5',
    username: 'testUser',
    password: '123456',
    name: 'teste1',
    role: 'operador',
    WebSocket: 'mywebsocket1',
  }),
  new User({
    _id: 'd5s5529',
    username: 'admin',
    password: '123',
    name: 'teste2',
    role: 'admin',
    WebSocket: 'mywebsocket2',
  }),
];

describe('userservice', () => {
  let userService: Userservice;
  let userRepository: Model<User>;
  let appGateway: AppGateway;
  let Criptography: Criptography;
  let serverSocket  : Server<ServerOptions>

  const updateUserEntity = new User({
    _id: 'userUpdate',
    username: 'userUpdate',
    password: '123456',
    name: 'update',
    role: 'operador',
    WebSocket: 'mywebsocket3',
  });

  beforeEach(async () => {
    const userMockRepository = {
      find: jest.fn().mockResolvedValue(userEntityList),
      findById: jest.fn().mockReturnValue(userEntityList[0]),
      findOne: jest.fn().mockReturnValue(userEntityList[0]),
      create: jest.fn().mockReturnValue(userEntityList[0]),
      save: jest.fn().mockResolvedValue(userEntityList[0]),
      findByIdAndUpdate: jest.fn().mockReturnValue(updateUserEntity),
      findOneAndDelete: jest.fn().mockReturnValue(undefined),
      exec: jest.fn().mockResolvedValue(userEntityList[1]),
      afterInit: jest.fn().mockImplementation(),
      emitRemoveUser: jest.fn().mockImplementation(),
      emitupdateUser: jest.fn().mockImplementation(),
      encodePwd: jest.fn().mockImplementation(),
      on: jest.fn().mockImplementation(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Userservice,
        AppGateway,
        {
          provide: getModelToken('User'),
          useValue: userMockRepository,
        },
      ],
    }).compile();

    userService = module.get<Userservice>(Userservice);
    userRepository = module.get<Model<User>>(getModelToken('User'));
    appGateway = module.get<AppGateway>(AppGateway);
    Criptography = module.get<Criptography>(Userservice);

  });

  // service foi definido
  test('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  // ListUser é uma função
  describe('findAll', () => {
    it('UserList retorna uma função', async () => {
      expect(userService.listUsers).toBe(userService.listUsers);
    });

    //Se listUser Retorna um Array com dados do usuário
    it('Retorna com sucesso uma lista (array) de users', async () => {
      const result = await userService.listUsers([User]);
      expect(result).toEqual(userEntityList);
      // console.log(result)
      //testando se meu user está sendo chamado pelo menos 1 vez.
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('Erro de exceção - NotFoundExceptions', () => {
      jest
        .spyOn(userRepository, 'find')
        .mockRejectedValueOnce(new Error('NotFoundExceptions'));
      expect(userRepository.find).rejects.toThrowError('NotFoundExceptions');
    });
  });
  describe('List user by id sucessfully', () => {
    it('Return user by id', async () => {
      const result = await userRepository.findById(userEntityList[0]._id);
      expect(result).toEqual(userEntityList[0]);
    });
  });
  it('Erro de exceção - BadRequestException', () => {
    jest
      .spyOn(userRepository, 'findById')
      .mockRejectedValueOnce(new Error('NotFoundException'));
    expect(userRepository.findById).rejects.toThrowError('NotFoundException');
  });

  describe('Create', () => {
    it('Create New User', async () => {
      const data = {
        _id: '89d58w5',
        username: 'testUser',
        password: '123456',
        name: 'teste1',
        role: 'operador',
        WebSocket: 'mywebsocket1',
      };

      const result = await userRepository.create(data);
      //utilizando variavel deu erro no hash da senha
      expect(result).toEqual(userEntityList[0]);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
    });
    it('Erro de exceção - BadRequestException', () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockRejectedValueOnce(new Error('BadRequestException'));
      expect(userRepository.findOne).rejects.toThrowError(
        'BadRequestException',
      );
    });
  });

  describe('Update User', () => {
    it('TEste Update', async () => {
      const data = {
        _id: 'userUpdate',
        username: 'userUpdate',
        password: '123456',
        name: 'update',
        role: 'operador',
        WebSocket: 'mywebsocket3',
      };

      const result = await userRepository.findByIdAndUpdate('userUpdate', data);
      expect(result).toEqual(updateUserEntity);
      console.log(result);
    });

    it('Erro de exceção - NotFoundExceptions', () => {
      const data = {
        _id: 'userUpdate',
        username: 'userUpdate',
        password: '123456',
        name: 'update',
        role: 'operador',
        WebSocket: 'mywebsocket3',
      };

      jest
        .spyOn(userRepository, 'findByIdAndUpdate')
        .mockRejectedValueOnce(new Error('NotFoundException'));
      expect(
        userRepository.findByIdAndUpdate('userUpdate', data),
      ).rejects.toThrowError('NotFoundException');
    });
  });

  describe('Delet User', () => {
    it('Delet Sucessfully', () => {
      const data = {
        _id: 'userUpdate',
        username: 'userUpdate',
        password: '123456',
        name: 'update',
        role: 'operador',
        WebSocket: 'mywebsocket3',
      };
      const result = userRepository.findOneAndDelete(data);
      expect(result).toBeUndefined();
    });

    const data = {
      _id: 'userUpdate',
      username: 'userUpdate',
      password: '123456',
      name: 'update',
      role: 'operador',
      WebSocket: 'mywebsocket3',
    };
    it('Shloud throw a not found exception', () => {
      jest
        .spyOn(userRepository, 'findOneAndDelete')
        .mockRejectedValueOnce(new Error('NotFoundException'));

      expect(userRepository.findOneAndDelete(data)).rejects.toThrowError(
        'NotFoundException',
      );
    });
  });
  describe('findOne', () => {
    it('findOne', async () => {
      const result = await userRepository.findOne(userEntityList[0]);
      expect(result).toEqual(userEntityList[0]);
      // console.log(result)
      //testando se meu user está sendo chamado pelo menos 1 vez.
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Erro de exceção - NotFoundExceptions', () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockRejectedValueOnce(new Error('NotFoundException'))
      expect(userRepository.findOne).rejects.toThrowError('NotFoundException');
    });
  });
});
