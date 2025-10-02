import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student, StudentSubject } from 'src/entities';
import { GoogleStrategy } from 'src/guards/strategy/google.strategy';
import { StudentService } from 'src/services';
import { ResponseUtils } from 'src/utils';
import { UserModule } from '../User/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Student, StudentSubject])],
  controllers: [AuthController],
  providers: [StudentService, ResponseUtils, AuthService, GoogleStrategy],
  exports: [],
})
export class AuthModule {}
