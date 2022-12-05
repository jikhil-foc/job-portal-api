/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateJobMock, JobMock } from '../../../mocks/jobs.mock';
import CreateJobDto from '../dto/create-job.dto';
import { JobService } from '../services/job.services';
import { JobController } from './job.controller';

describe('JobController', () => {
  let controller: JobController;

  const jobs = JobMock;

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
    deleteJob: jest.fn((id) => {
      return jobs.find((job) => job.id === id);
    }),
    updateJob: jest.fn((id, dto: CreateJobDto) => {
      const result = jobs.map((job) => {
        if (job.id === id) {
          return Object.assign({}, job, dto);
        }
        return job;
      });

      return result[0];
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

  it('should update jobs', () => {
    const job: CreateJobDto = CreateJobMock;
    expect(controller.updateJob(1, job)).toEqual({
      id: expect.any(Number),
      ...job,
    });
  });

  it('should delete job by Id', () => {
    const deletedJob = jobs.find((job) => job.id === 1);
    expect(controller.deleteJob(1)).toEqual(deletedJob);
  });
});
