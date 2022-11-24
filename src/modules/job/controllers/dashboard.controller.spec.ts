/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from '../services/dashboard.service';
import { DashboardController } from './dashboard.controller';

describe('DashboardController', () => {
  let controller: DashboardController;

  const dashboardCount = {
    users: 72,
    jobs: 25,
  };

  const dashboardServiceMock = {
    getDashboardCount: jest.fn(() => {
      return dashboardCount;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [DashboardService],
    })
      .overrideProvider(DashboardService)
      .useValue(dashboardServiceMock)
      .compile();

    controller = module.get<DashboardController>(DashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get Dashboard counts', () => {
    expect(controller.getDashboardCount()).toEqual(dashboardCount);
  });
});
