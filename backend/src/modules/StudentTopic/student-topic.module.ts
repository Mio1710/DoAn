import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportTopic, Semester } from 'src/entities';
import { Topic } from 'src/modules/Topic/entities/topic.entity';
// import { SemesterService } from 'src/services';
import { ResponseUtils } from 'src/utils';
import { CommonModule } from '../common/common.module';
import { SemesterService } from '../Semester/semester.service';
import { Group } from './entities/group.entity';
import { StudentTopic } from './entities/student-topic.entity';
import { StudentTopicController } from './student-topic.controller';
import { StudentTopicService } from './student-topic.service';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([
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
