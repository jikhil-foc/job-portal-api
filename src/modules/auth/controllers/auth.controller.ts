import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from '../dto/user-registration.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Authentication')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('get-all-users')
  @ApiOperation({ summary: 'Get Users' })
  getUsers() {
    return this.authService.getAll();
  }

  @Post('register')
  @ApiOperation({ summary: 'register new users' })
  registerUsers(@Body() userDto: UserRegisterDto) {
    return this.authService.createUser(userDto);
  }

  @Post('create-admin')
  @ApiOperation({ summary: 'register new admin users' })
  createAdmin(@Body() userDto: UserRegisterDto) {
    return this.authService.createAdminUser(userDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  login(@Body() userDto: UserRegisterDto) {
    return this.authService.login(userDto);
  }
}
