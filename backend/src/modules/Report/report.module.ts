import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentTopicModule } from '../StudentTopic/student-topic.module';
import { CommonModule } from './../common/common.module';
import { ReportTopic } from './entity/report.entity';
import { ReportController } from './report.controller';
import { ReportTopicService } from './report.service';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([ReportTopic]),
    StudentTopicModule,
  ],
  controllers: [ReportController],
  providers: [ReportTopicService],
  exports: [],
})
export class ReportModule {}
