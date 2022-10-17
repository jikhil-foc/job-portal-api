import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientJobService } from '../services/client-job.service';

@ApiTags('Client Job Section')
@Controller('')
export class ClientJobController {
  constructor(private readonly clientJobService: ClientJobService) {}

  @Get('get-all')
  @ApiOperation({ summary: 'Get All Jobs' })
  getAllJobs(@Query('filter') filter: string = '') {
    return this.clientJobService.getAllJobs(filter);
  }
}
