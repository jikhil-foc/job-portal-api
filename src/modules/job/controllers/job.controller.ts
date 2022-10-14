import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { filter } from 'rxjs';
import CreateJobDto from '../dto/create-job.dto';
import { JobService } from '../services/job.services';

@ApiTags('Job Section')
@Controller('')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('create-job')
  @ApiOperation({ summary: 'create new job' })
  createJob(@Body() jobDto: CreateJobDto) {
    return this.jobService.createJob(jobDto);
  }

  @Patch('update-job/:id')
  @ApiOperation({ summary: 'update job' })
  updateJob(@Param('id') id: number, @Body() jobDto: CreateJobDto) {
    console.log(id);
    return this.jobService.updateJob(id, jobDto);
  }

  @Get('get-all-jobs')
  @ApiOperation({ summary: 'Get All Jobs' })
  getJobs(
    @Query('page') pageNo: number = 1,
    @Query('limit') pageLimit: number = 10,
  ) {
    return this.jobService.getJobs(pageNo, pageLimit);
  }

  @Get('get-all')
  @ApiOperation({ summary: 'Get All Jobs' })
  getAllJobs(@Query('filter') filter: string = '') {
    return this.jobService.getAllJobs(filter);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Job' })
  deleteJob(@Param('id', ParseIntPipe) id: number) {
    return this.jobService.deleteJob(id);
  }
}
