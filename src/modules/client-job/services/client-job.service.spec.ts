import { Test, TestingModule } from '@nestjs/testing';
import { ClientJobService } from './client-job.service';

describe('ClientJobService', () => {
  let service: ClientJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientJobService],
    }).compile();

    service = module.get<ClientJobService>(ClientJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
