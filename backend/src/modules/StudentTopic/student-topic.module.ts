import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from 'src/modules/Topic/entities/topic.entity';
// import { SemesterService } from 'src/services';
import { ResponseUtils } from 'src/utils';
import { CommonModule } from '../common/common.module';
import { SemesterService } from '../Semester/semester.service';
import { Group } from './entities/group.entity';
import { LOStudentTopic } from './entities/lo-student-topic.entity';
import { StudentTopic } from './entities/student-topic.entity';
import { StudentTopicController } from './student-topic.controller';
import { StudentTopicService } from './student-topic.service';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([StudentTopic, Group, Topic, LOStudentTopic]),
  ],
  controllers: [StudentTopicController],
  providers: [StudentTopicService, ResponseUtils, SemesterService],
  exports: [StudentTopicService, TypeOrmModule],
})
export class StudentTopicModule {}
