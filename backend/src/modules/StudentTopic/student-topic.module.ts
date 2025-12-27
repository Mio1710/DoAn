import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group, ReportTopic, Semester } from 'src/entities';
import { Topic } from 'src/modules/Topic/entities/topic.entity';
// import { SemesterService } from 'src/services';
import { ResponseUtils } from 'src/utils';
import { SemesterService } from '../Semester/semester.service';
import { Student } from '../Student/entity/student.entity';
import { StudentModule } from '../Student/student.module';
import { StudentTopic } from './entities/student-topic.entity';
import { StudentTopicController } from './student-topic.controller';
import { StudentTopicService } from './student-topic.service';

@Module({
  imports: [
    StudentModule,
    TypeOrmModule.forFeature([
      Student,
      ReportTopic,
      StudentTopic,
      Group,
      Topic,
      Semester,
    ]),
  ],
  controllers: [StudentTopicController],
  providers: [StudentTopicService, ResponseUtils, SemesterService],
  exports: [StudentTopicService],
})
export class StudentTopicModule {}
