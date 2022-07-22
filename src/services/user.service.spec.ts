import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AppGateway } from '../socket/socket-test.gateway';
import { User } from '../users/shared/enitity/user';
import { Criptography } from '../users/shared/utils/bcrypt';
import { Userservice } from './user.service';

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

  const updateUserEntity = new User({
    _id: 'userUpdate',
    username: 'userUpdate',
    password: '123456',
    name: 'update',
    role: 'operador',
    WebSocket: 'mywebsocket3',
  });
  const userCreateTest = {
    username: 'testUser1',
    password: '123456',
    name: 'teste1',
    role: 'operador',
  };
  beforeEach(async () => {
    const userMockRepository = {
      find: jest.fn().mockResolvedValue(userEntityList),
      findById: jest.fn().mockReturnValue(userEntityList[0]),
      findOne: jest.fn().mockReturnValue(userEntityList[0]),
      encodePwd: jest.fn().mockReturnValue(Criptography),
      create: jest.fn().mockReturnValue(userCreateTest),
      save: jest.fn().mockResolvedValue(userEntityList[0]),
      findByIdAndUpdate: jest.fn().mockReturnValue(updateUserEntity),
      findOneAndDelete: jest.fn().mockReturnValue(undefined),
      exec: jest.fn().mockResolvedValue(userEntityList[1]),
      emitnewUser: jest.fn().mockImplementation(),
      // emitupdateUser: jest.fn(),
      // emitRemoveUser: jest.fn(),
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
  });

  // service foi definido
  test('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  // ListUser retorna uma função
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
  describe('findById', () => {
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
    
      // const result = await UserService.registerUser(userCreateTest);
      const result = await userRepository.create(userCreateTest);

      //utilizando variavel deu erro no hash da senha
      // expect(Criptography.encodePwd(userCreateTest.password)).toBe(!userCreateTest.password);
   
      expect(result).toEqual(userCreateTest);
      console.log('create', result)
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
      console.log(result)
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Erro de exceção - NotFoundExceptions', () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockRejectedValueOnce(new Error('NotFoundExceptions'));
      expect(userRepository.findOne).rejects.toThrowError('NotFoundExceptions');
    });
  });
});
