import { Test, TestingModule } from '@nestjs/testing';
import { ClientJobController } from './client-job.controller';

describe('ClientJobController', () => {
  let controller: ClientJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientJobController],
    }).compile();

    controller = module.get<ClientJobController>(ClientJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
