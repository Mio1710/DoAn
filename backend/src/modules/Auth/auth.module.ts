import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSubject } from 'src/entities';
import { ResponseUtils } from 'src/utils';
import { StudentModule } from '../Student/student.module';
import { UserModule } from '../User/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './guards/strategy/google.strategy';

@Module({
  imports: [
    UserModule,
    StudentModule,
    TypeOrmModule.forFeature([StudentSubject]),
  ],
  controllers: [AuthController],
  providers: [ResponseUtils, AuthService, GoogleStrategy],
  exports: [],
})
export class AuthModule {}
