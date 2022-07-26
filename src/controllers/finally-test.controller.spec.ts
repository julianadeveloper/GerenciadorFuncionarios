import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import { Userservice } from '../services/user.service';
import { User } from '../users/shared/enitity/user';
import { UsersController } from './users.controller';

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
describe('User Controller', () => {
  let controller: UsersController;
  let service: Userservice;
  let jwtService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],

      providers: [ JwtService,
        {
          provide: Userservice,
          useValue: {
            listUsers: jest.fn().mockResolvedValue(
              userEntityList
            ),
            // getOne: jest.fn().mockImplementation((id: string) =>
            //   Promise.resolve({
            //     name: testCat1,
            //     breed: testBreed1,
            //     age: 4,
            //     _id: id,
            //   }),
            // ),
            getOneByName: jest
              .fn()
              .mockImplementation((userEntityList: User) =>
                Promise.resolve(userEntityList[0]),
              ),
            insertOne: jest
              .fn()
              .mockImplementation((userEntityList: User) =>
              Promise.resolve(userEntityList[0])              ),
            // updateOne: jest
            //   .fn()
            //   .mockImplementation((cat: CatDTO) =>
            //     Promise.resolve({ _id: 'a uuid', ...cat }),
            //   ),
            deleteOne: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<Userservice>(Userservice);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get Users',  () => {
    it('should get an array of cats', async () => {
      const result =  await controller.listUsers([User])
      // expect(result).toEqual(userEntityList)
      console.log(result)
      expect(result).toEqual(userEntityList);
    });
  });
  // describe('Jwt', () => {
  //   it('should get a single cat', () => {
  //     expect(jwtService.login()).resolves.toEqual({
  //   });
  // });
  // // describe('getByName', () => {
  // //   it('should get a cat back', async () => {
  // //     await expect(controller.getByName('Ventus')).resolves.toEqual({
  // //       name: 'Ventus',
  // //       breed: testBreed1,
  // //       age: 4,
  // //     });
  // //     // using the really cool @golevelup/nestjs-testing module's utility function here
  // //     // otherwise we need to pass `as any` or we need to mock all 54+ attributes of Document
  // //     const aquaMock = createMock<Cat>({
  // //       name: 'Aqua',
  // //       breed: 'Maine Coon',
  // //       age: 5,
  // //     });
  // //     const getByNameSpy = jest
  // //       .spyOn(service, 'getOneByName')
  // //       .mockResolvedValueOnce(aquaMock);
  // //     const getResponse = await controller.getByName('Aqua');
  // //     expect(getResponse).toEqual(aquaMock);
  // //     expect(getByNameSpy).toBeCalledWith('Aqua');
  // //   });
  // // });
  // // describe('newCat', () => {
  // //   it('should create a new cat', () => {
  // //     const newCatDTO: CatDTO = {
  // //       name: 'New Cat 1',
  // //       breed: 'New Breed 1',
  // //       age: 4,
  // //     };
  // //     expect(controller.newCat(newCatDTO)).resolves.toEqual({
  // //       _id: 'a uuid',
  // //       ...newCatDTO,
  // //     });
  // //   });
  // // });
  // // describe('updateCat', () => {
  // //   it('should update a new cat', () => {
  // //     const newCatDTO: CatDTO = {
  // //       name: 'New Cat 1',
  // //       breed: 'New Breed 1',
  // //       age: 4,
  // //     };
  // //     expect(controller.updateCat(newCatDTO)).resolves.toEqual({
  // //       _id: 'a uuid',
  // //       ...newCatDTO,
  // //     });
  // //   });
  // // });
  // // describe('deleteCat', () => {
  // //   it('should return that it deleted a cat', () => {
  // //     expect(controller.deleteCat('a uuid that exists')).resolves.toEqual({
  // //       deleted: true,
  // //     });
  // //   });
  // //   it('should return that it did not delete a cat', () => {
  // //     const deleteSpy = jest
  // //       .spyOn(service, 'deleteOne')
  // //       .mockResolvedValueOnce({ deleted: false });
  // //     expect(
  // //       controller.deleteCat('a uuid that does not exist'),
  // //     ).resolves.toEqual({ deleted: false });
  // //     expect(deleteSpy).toBeCalledWith('a uuid that does not exist');
  // //   });
  // });
});