import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Semester, Student, StudentSubject } from 'src/entities';
import { GoogleStrategy } from 'src/modules/Auth/guards/strategy/google.strategy';
import { StudentService } from 'src/services';
import { ResponseUtils } from 'src/utils';
import { AuthService } from '../Auth/auth.service';
import { SemesterService } from '../Semester/semester.service';
import { StudentTopic } from '../StudentTopic/entities/student-topic.entity';
import { UserModule } from '../User/user.module';
import { TopicSemester } from './entities/topic-semester.entity';
import { Topic } from './entities/topic.entity';
import { TopicController } from './topic.controller';
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
      StudentTopic,
    ]),
  ],
  controllers: [TopicController],
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
