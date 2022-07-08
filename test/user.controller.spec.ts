import {UsersController} from '../src/users/users.controller'
import {Userservice} from '../src/users/shared/user.service'

describe('CatsController', () => {
  let usersController: UsersController;
  let usersService: Userservice;

  beforeEach(() => {
    usersService = new Userservice();
    usersController = new UsersController(Userservice);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

      expect(await catsController.findAll()).toBe(result);
    });
  });
});