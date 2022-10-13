import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User, { UserRole } from '../../../entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from '../dto/user-registration.dto';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getAll() {
    const [users, count] = await this.repo.findAndCount();
    return {
      users,
      count,
    };
  }

  async createAdminUser(user: UserRegisterDto) {
    const userData = new User();
    userData.email = user.email;
    userData.password = user.password;
    userData.name = user.name;
    userData.role = UserRole.ADMIN;

    const isDuplicate =
      (await this.repo.count({
        where: {
          email: user.email,
        },
      })) > 0;

    if (isDuplicate) {
      throw new HttpException('Email id already exist', 400);
    }

    await this.repo.save(userData);

    return {
      message: 'Admin user has been Created',
    };
  }

  async createUser(user: UserRegisterDto) {
    const userData = new User();
    userData.email = user.email;
    userData.password = user.password;
    userData.name = user.name;
    userData.role = UserRole.USER;

    const isDuplicate =
      (await this.repo.count({
        where: {
          email: user.email,
        },
      })) > 0;

    if (isDuplicate) {
      throw new HttpException('Email id already exist', 400);
    }

    await this.repo.save(userData);

    return {
      message: 'User has been Registered',
    };
  }

  async login(userData: UserLoginDto) {
    const user = await this.repo.findOne({
      where: { email: userData.email, password: userData.password },
    });

    if (user) {
      const payload = { ...user };
      return {
        access_token: this.jwtService.sign(payload),
        user: payload,
      };
    }
    throw new UnauthorizedException();
  }
}
