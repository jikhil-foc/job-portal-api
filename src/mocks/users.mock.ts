/* eslint-disable prettier/prettier */
import { UserRegisterDto } from '../modules/auth/dto/user-registration.dto';
export const UsersMock = [
  {
    id: 1,
    name: 'admin',
    email: 'admin@gmail.com',
    role: 'admin',
    isActive: true,
  },
  {
    id: 2,
    name: 'jikhil',
    email: 'jikhilps@focaloid.com',
    role: 'user',
    isActive: true,
  },
  {
    id: 3,
    name: 'akhil',
    email: 'akhilraj@foc.com',
    role: 'user',
    isActive: true,
  },
  {
    id: 4,
    name: 'sample.pdf',
    email: 'dsadsad@gmail.com',
    role: 'user',
    isActive: true,
  },
  {
    id: 5,
    name: 'jikhil',
    email: 'jikhilps@gmail.com',
    role: 'user',
    isActive: true,
  },
  {
    id: 6,
    name: 'sample.pdf',
    email: 'jikhlps@focaloid.com',
    role: 'user',
    isActive: true,
  },
  {
    id: 7,
    name: 'firoz',
    email: 'firzo@fm.com',
    role: 'user',
    isActive: true,
  },
  {
    id: 8,
    name: 'vinod',
    email: 'vinod@foc.in',
    role: 'user',
    isActive: true,
  },
  {
    id: 9,
    name: 'jikhil',
    email: 'dsadsffad@gmail.com',
    role: 'user',
    isActive: true,
  },
  {
    id: 10,
    name: 'sample.pdf',
    email: 'admidn@gmail.com',
    role: 'user',
    isActive: true,
  },
  {
    id: 13,
    name: 'jikhil',
    email: 'itadmin@focaloid.com',
    role: 'user',
    isActive: true,
  },
];

export const CreateUserMock: UserRegisterDto = {
  name: 'admin',
  email: 'admin@gmail.com',
  isActive: true,
  password: 'Admin@123',
};

export const CreateAdminMock: UserRegisterDto = {
  name: 'admin',
  email: 'admin@gmail.com',
  isActive: true,
  password: 'Admin@123',
};
