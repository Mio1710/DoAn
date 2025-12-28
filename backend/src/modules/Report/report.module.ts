import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentInternModule } from '../StudentIntern/student-intern.module';
import { StudentTopicModule } from '../StudentTopic/student-topic.module';
import { CommonModule } from './../common/common.module';
import { ReportIntern } from './entity/report-intern.entity';
import { ReportTopic } from './entity/report.entity';
import { ReportInternController } from './report-intern.controller';
import { ReportInternService } from './report-intern.service';
import { ReportController } from './report.controller';
import { ReportTopicService } from './report.service';

@Module({
  imports: [
    CommonModule,
    StudentInternModule,
    TypeOrmModule.forFeature([ReportTopic, ReportIntern]),
    StudentTopicModule,
  ],
  controllers: [ReportController, ReportInternController],
  providers: [ReportTopicService, ReportInternService],
  exports: [],
})
export class ReportModule {}
