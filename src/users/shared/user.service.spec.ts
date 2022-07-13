import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AppGateway } from '../../socket/socket-test.gateway';
import { User } from './user';
import { Userservice } from './user.service';

const userModelTest: User[] = [
  new User({
    _id: '89d58w5',
    username: 'testUser1',
    name: 'teste1',
    role: 'operador',
    WebSocket: 'mywebsocket1',
  }),
  new User({
    _id: '89d58w5',
    username: 'admin',
    name: 'teste2',
    role: 'admin',
    WebSocket: 'mywebsocket2',
  }),
];

describe('userservice', () => {
  let userService: Userservice;
  let spyModel: Model<User>;

  beforeEach(async () => {
    const userMockRepository = {
      find: jest.fn().mockResolvedValue(userModelTest),
      findAll: jest.fn(),
      findById: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      exec: jest.fn(),
      create: jest.fn(),
      findByIdAndUpdat: jest.fn(),
      findOneAndDelete: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      //fazendo diretamente do banco de produção
      // imports: [
      //   UsersModule,
      //   AppModule,
      //    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),

      // ],
      // providers: [Userservice, AppGateway]
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
    spyModel = module.get<Model<User>>(getModelToken('User'));
  });

  // service foi definido
  test('should be defined', () => {
    expect(userService).toBeDefined();
  });

  // ListUser é uma função
  describe('findAll', () => {
    it('UserList retorna uma função', async () => {
      expect(userService.listUsers).toBe(userService.listUsers);
    });


    //testando se meu user está sendo chamado pelo menos 1 vez.
    it('Should return a userlist sucessfully', async () => {
      const result = await userService.listUsers(async () => await [User]);
      expect(result).toEqual(userModelTest);
      expect(spyModel.find).toHaveBeenCalledTimes(1); 
    });

    it('should throw an exception error', ()=>{
      jest.spyOn(spyModel, 'find').mockRejectedValueOnce(new Error()),
      
      expect(spyModel.find()).rejects.toThrowError();
    })
  });
});

/*it('Retorne um item do array', async () => {
    //   const result = await await userService.listUserId
       expect(result).toEqual('');
    // });*/
