import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { DashboardController } from './controllers/dashboard.controller';
import { JobController } from './controllers/job.controller';
import { DashboardService } from './services/dashboard.service';
import { JobService } from './services/job.services';

@Module({
  imports: [SharedModule],
  controllers: [JobController, DashboardController],
  providers: [JobService, DashboardService],
})
export class JobModule {}
