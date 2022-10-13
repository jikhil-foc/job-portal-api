import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import CreateJobDto from '../dto/create-job.dto';
import { DashboardService } from '../services/dashboard.service';
import { JobService } from '../services/job.services';

@ApiTags('dashboard')
@Controller('')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('get-dashboard')
  @ApiOperation({ summary: 'Get Dashboard Content' })
  getDashboardCount() {
    return this.dashboardService.getDashboardCount();
  }
}
