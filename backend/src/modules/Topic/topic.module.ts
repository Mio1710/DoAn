import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Semester, Student, StudentSubject } from 'src/entities';
import { GoogleStrategy } from 'src/guards/strategy/google.strategy';
import { SemesterService, StudentService } from 'src/services';
import { ResponseUtils } from 'src/utils';
import { AuthController } from '../Auth/auth.controller';
import { AuthService } from '../Auth/auth.service';
import { UserModule } from '../User/user.module';
import { TopicSemester } from './entities/topic-semester.entity';
import { Topic } from './entities/topic.entity';
import { TopicService } from './topic.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      Student,
      StudentSubject,
      Topic,
      Semester,
      TopicSemester,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    StudentService,
    ResponseUtils,
    AuthService,
    GoogleStrategy,
    TopicService,
    SemesterService,
  ],
  exports: [TopicService],
})
export class TopicModule {}
