import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Job from '../../../entity/job.entity';
import { Raw, Repository } from 'typeorm';

@Injectable()
export class ClientJobService {
  constructor(
    @InjectRepository(Job)
    private repo: Repository<Job>,
  ) {}

  async getAllJobs(title: string, location: string) {
    const [jobs, count] = await this.repo.findAndCount({
      relations: {
        skills: true,
      },
      order: { id: 'ASC' },
      where: [
        {
          title: Raw((alias) => `LOWER(${alias}) Like '%${title}%'`),
          location: Raw((alias) => `LOWER(${alias}) Like '%${location}%'`),
        },
      ],
    });

    return { jobs, count };
  }

  async getJobDetailsById(id: number) {
    const job = await this.repo.findOne({
      relations: {
        skills: true,
      },
      where: { id },
    });

    return job;
  }
}
