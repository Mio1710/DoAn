import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { LOModule } from '../LO/lo.module';
import { StudentTopicModule } from '../StudentTopic/student-topic.module';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';

@Module({
  imports: [LOModule, StudentTopicModule, CommonModule],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
