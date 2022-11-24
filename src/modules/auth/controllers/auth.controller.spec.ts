/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateAdminMock,
  CreateUserMock,
  UsersMock,
} from '../../../mocks/users.mock';
import { UserRegisterDto } from '../dto/user-registration.dto';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  const users = UsersMock;

  const authServiceMock = {
    getAll: jest.fn(() => {
      return users;
    }),
    createUser: jest.fn((dto: UserRegisterDto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    createAdminUser: jest.fn((dto: UserRegisterDto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(authServiceMock)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should fetch all user', () => {
    expect(controller.getUsers()).toEqual(users);
  });

  it('should create Admin user', () => {
    const adminUser = CreateAdminMock;
    expect(controller.createAdmin(adminUser)).toEqual({
      id: expect.any(Number),
      ...adminUser,
    });
  });

  it('should create user', () => {
    const registeredUser = CreateUserMock;
    expect(controller.registerUsers(registeredUser)).toEqual({
      id: expect.any(Number),
      ...registeredUser,
    });
  });
});
