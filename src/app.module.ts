import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ClientJobModule } from './modules/client-job/client-job.module';
import { JobModule } from './modules/job/job.module';
import { routes } from './router';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RouterModule.register(routes),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'job-portal',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    AuthModule,
    JobModule,
    ClientJobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
