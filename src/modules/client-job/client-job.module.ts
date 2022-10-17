import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { ClientJobController } from './controller/client-job.controller';
import { ClientJobService } from './services/client-job.service';

@Module({
  imports: [SharedModule],
  controllers: [ClientJobController],
  providers: [ClientJobService],
})
export class ClientJobModule {}
