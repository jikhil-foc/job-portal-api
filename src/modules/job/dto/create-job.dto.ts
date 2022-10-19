import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export default class CreateJobDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  experience: string;

  @ApiProperty()
  @IsString()
  company: string;

  @ApiProperty()
  @IsString()
  salary: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  skills: string[];

  @ApiProperty()
  @IsString()
  jobType: string;

  @ApiProperty()
  @IsString()
  shift: string;
}
