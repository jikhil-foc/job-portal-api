/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateJobMock,
  JobMock,
  SingleJobMock,
} from '../../../mocks/jobs.mock';
import CreateJobDto from '../dto/create-job.dto';
import { JobService } from '../services/job.services';
import { JobController } from './job.controller';

describe('JobController', () => {
  let controller: JobController;

  const jobs = JobMock;
  const singleJob = SingleJobMock;

  const jobServiceMock = {
    getJobs: jest.fn((pageNo = 1, pageLimit = 10) => {
      return jobs;
    }),
    getAllJobs: jest.fn((filter) => {
      return jobs.filter((job) => job.title === filter);
    }),
    createJob: jest.fn((dto: CreateJobDto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [JobService],
    })
      .overrideProvider(JobService)
      .useValue(jobServiceMock)
      .compile();

    controller = module.get<JobController>(JobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all jobs', () => {
    expect(controller.getJobs(1, 10)).toEqual(jobs);
  });

  it('should find a jobs by search', () => {
    const filteredJobs = jobs.filter(
      (job) => job.title === 'Sales Counselor in Edtech',
    );
    expect(controller.getAllJobs('Sales Counselor in Edtech')).toEqual(
      filteredJobs,
    );
  });

  it('should create jobs', () => {
    const job: CreateJobDto = CreateJobMock;
    expect(controller.createJob(job)).toEqual({
      id: expect.any(Number),
      ...job,
    });
  });
});
