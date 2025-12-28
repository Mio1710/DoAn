import { Module } from '@nestjs/common';
import { StudentModule } from '../Student/student.module';
import { TeacherGroupController } from './controllers/teacher-group.controller';
import { TeacherController } from './controllers/teacher.controller';
import { RecommendTopicService } from './services/recommend-topic.service';
import { TeacherService } from './services/teacher.service';

@Module({
  imports: [StudentModule],
  controllers: [TeacherController, TeacherGroupController],
  providers: [TeacherService, RecommendTopicService],
  exports: [],
})
export class TeacherModule {}
