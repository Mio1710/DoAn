import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseUtils } from 'src/utils';
import { CommonService } from './common.service';
import { Faculty } from './entities/faculty.entity';
import { Semester } from './entities/semester.entity';
import { Student } from './entities/student.entity';
import { User } from './entities/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Semester, Faculty, Student, User])],
  providers: [CommonService, ResponseUtils],
  exports: [CommonService, TypeOrmModule, ResponseUtils],
})
export class CommonModule {}
