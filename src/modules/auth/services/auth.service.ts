import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User, { UserRole } from '../../../entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from '../dto/user-registration.dto';
import { JwtService } from '@nestjs/jwt';

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
    userData.role = UserRole.ADMIN;

    return await this.repo.save(userData);
  }

  async createUser(user: UserRegisterDto) {
    const userData = new User();
    userData.email = user.email;
    userData.password = user.password;
    userData.role = UserRole.USER;

    return await this.repo.save(userData);
  }

  async login(userData: UserRegisterDto) {
    const user = await this.repo.findOne({
      where: { email: userData.email, password: userData.password },
    });

    if (user) {
      const payload = { ...user };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException();
  }
}
