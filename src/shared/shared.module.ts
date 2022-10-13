import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Job from 'src/entity/job.entity';
import Skill from 'src/entity/skill.entity';
import User from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Job, Skill])],
  exports: [TypeOrmModule],
})
export class SharedModule {}
