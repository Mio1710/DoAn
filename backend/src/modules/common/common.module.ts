import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Semester } from 'src/entities';
import { ResponseUtils } from 'src/utils';
import { CommonService } from './common.service';
import { Faculty } from './entities/faculty.entity';
import { Student } from './entities/student.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Semester, Faculty, Student])],
  providers: [CommonService, ResponseUtils],
  exports: [CommonService, TypeOrmModule, ResponseUtils],
})
export class CommonModule {}
