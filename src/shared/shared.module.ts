import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Job from '../entity/job.entity';
import Skill from '../entity/skill.entity';
import User from '../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Job, Skill])],
  exports: [TypeOrmModule],
})
export class SharedModule {}
