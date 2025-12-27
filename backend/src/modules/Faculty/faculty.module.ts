import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { FacultyController } from './faculty.controller';
import { FacultyRepository } from './faculty.repository';
import { FacultyService } from './faculty.service';

@Module({
  imports: [CommonModule],
  controllers: [FacultyController],
  providers: [FacultyService, FacultyRepository],
  exports: [FacultyService],
})
export class FacultyModule {}
