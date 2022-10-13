import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Job from 'src/entity/job.entity';
import User from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Job)
    private jobRepo: Repository<Job>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getDashboardCount() {
    const users = await this.userRepo.count();
    const jobs = await this.jobRepo.count();

    return {
      users,
      jobs,
    };
  }
}
