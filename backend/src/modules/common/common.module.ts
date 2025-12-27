import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Semester } from 'src/entities';
import { CommonService } from './common.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Semester])],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
