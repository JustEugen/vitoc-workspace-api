import { DatabaseModule } from './../../core/database/database.module';
import { UserEntityModule } from './../../entities/user-entity/user-entity.module';
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';

@Module({
  imports: [UserEntityModule, DatabaseModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthApiModule {}
