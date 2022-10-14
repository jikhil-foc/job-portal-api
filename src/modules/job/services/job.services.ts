import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Raw, Repository } from 'typeorm';
import Job from '../../../entity/job.entity';
import CreateJobDto from '../dto/create-job.dto';
import Skill from '../../../entity/skill.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private repo: Repository<Job>,
    @InjectRepository(Skill)
    private skillRepo: Repository<Skill>,
  ) {}

  async createJob(jobDto: CreateJobDto) {
    const job = new Job();
    job.skills = [];
    for await (const skillData of jobDto.skills) {
      const duplicateSkilll = await this.skillRepo.findOne({
        where: {
          name: skillData,
        },
      });

      if (duplicateSkilll) {
        job.skills.push(duplicateSkilll);
      } else {
        const skill = new Skill();
        skill.name = skillData;
        await this.skillRepo.save(skill);
        job.skills.push(skill);
      }
    }

    job.title = jobDto.title;
    job.description = jobDto.description;
    job.experience = jobDto.experience;
    job.company = jobDto.company;
    job.salary = jobDto.salary;
    job.isActive = true;

    await this.repo.save(job);

    return {
      message: 'Job has been created successfully',
    };
  }

  async updateJob(id: number, jobDto: CreateJobDto) {
    const job = new Job();
    job.skills = [];
    // for await (const skillData of jobDto.skills) {
    //   const duplicateSkilll = await this.skillRepo.findOne({
    //     where: {
    //       name: skillData,
    //     },
    //   });

    //   if (duplicateSkilll) {
    //     job.skills.push(duplicateSkilll);
    //   } else {
    //     const skill = new Skill();
    //     skill.name = skillData;
    //     await this.skillRepo.save(skill);
    //     job.skills.push(skill);
    //   }
    // }

    job.title = jobDto.title;
    job.description = jobDto.description;
    job.experience = jobDto.experience;
    job.company = jobDto.company;
    job.salary = jobDto.salary;
    job.isActive = true;
    job.id = id;

    await this.repo.save(job);

    return {
      message: 'Job has been updated successfully',
    };
  }

  async getJobs(page: number, limit: number) {
    const [jobs, count] = await this.repo.findAndCount({
      relations: {
        skills: true,
      },
      order: { id: 'ASC' },
      skip: page,
      take: limit,
    });

    return { jobs, count };
  }

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

  async deleteJob(id: number) {
    return await this.repo.delete(id);
  }
}
