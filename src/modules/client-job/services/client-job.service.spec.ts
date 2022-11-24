import { Test, TestingModule } from '@nestjs/testing';
import { ClientJobService } from './client-job.service';

describe('ClientJobService', () => {
  let service: ClientJobService;

  const clientJobMockService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientJobService],
    })
      .overrideProvider(ClientJobService)
      .useValue(clientJobMockService)
      .compile();

    service = module.get<ClientJobService>(ClientJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
