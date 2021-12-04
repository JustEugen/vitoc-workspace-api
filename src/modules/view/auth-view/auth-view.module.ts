import { AuthController } from './auth.controller';
import { AuthApiModule } from './../../api/auth-api/auth-api.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthApiModule],
  controllers: [AuthController],
})
export class AuthViewModule {}
