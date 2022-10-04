import { Routes } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthModule } from './modules/auth/auth.module';

export const routes: Routes = [
  {
    path: 'api/v1',
    module: AppModule,
    children: [
      {
        path: 'auth',
        module: AuthModule,
      },
    ],
  },
];
