/* eslint-disable prettier/prettier */
import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DashboardService } from '../services/dashboard.service';

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
