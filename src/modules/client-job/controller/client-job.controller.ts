import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientJobService } from '../services/client-job.service';

@ApiTags('Client Job Section')
@Controller('')
export class ClientJobController {
  constructor(private readonly clientJobService: ClientJobService) {}

  @Get('get-all')
  @ApiOperation({ summary: 'Get All Jobs' })
  getAllJobs(
    @Query('position') position = '',
    @Query('location') location = '',
  ) {
    return this.clientJobService.getAllJobs(position, location);
  }

  @Get('get-job/:id')
  @ApiOperation({ summary: 'Get Job Details by Id' })
  getJobDetailsById(@Param('id') id: number) {
    return this.clientJobService.getJobDetailsById(id);
  }
}
