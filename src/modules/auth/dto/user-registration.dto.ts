import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRegisterDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(200)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  password: string;

  @IsString()
  @IsOptional()
  @IsIn([true, false])
  isActive: Boolean;
}
