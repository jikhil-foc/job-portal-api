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

  async getAllJobs(filter: string) {
    const [jobs, count] = await this.repo.findAndCount({
      relations: {
        skills: true,
      },
      order: { id: 'ASC' },
      where: [
        { title: Raw((alias) => `LOWER(${alias}) Like '%${filter}%'`) },
        { company: Raw((alias) => `LOWER(${alias}) Like '%${filter}%'`) },
      ],
    });

    return { jobs, count };
  }
}
