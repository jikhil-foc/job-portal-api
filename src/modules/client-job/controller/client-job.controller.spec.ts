import { Test, TestingModule } from '@nestjs/testing';
import { JobMock, SingleJobMock } from '../../../mocks/jobs.mock';
import { ClientJobService } from '../services/client-job.service';
import { ClientJobController } from './client-job.controller';

describe('ClientJobController', () => {
  let controller: ClientJobController;

  const jobs = JobMock;
  const singleJob = SingleJobMock;

  const clientJobServiceMock = {
    getAllJobs: jest.fn((position, location) => {
      const job = jobs.filter(
        (job) => job.location === location && job.title === position,
      );

      return job;
    }),
    getJobDetailsById: jest.fn((id) => {
      const job = jobs.find((job) => job.id === id);

      return job;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientJobController],
      providers: [ClientJobService],
    })
      .overrideProvider(ClientJobService)
      .useValue(clientJobServiceMock)
      .compile();

    controller = module.get<ClientJobController>(ClientJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find a job', () => {
    expect(controller.getJobDetailsById(1)).toEqual(singleJob);
  });

  it('should find a jobs by search', () => {
    const filteredJobs = jobs.filter(
      (job) =>
        job.title === 'Sales Counselor in Edtech' && job.location === 'Mumbai',
    );
    expect(
      controller.getAllJobs('Sales Counselor in Edtech', 'Mumbai'),
    ).toEqual(filteredJobs);
  });
});
