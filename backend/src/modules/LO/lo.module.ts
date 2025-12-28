import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LO } from './entity/lo.entity';
import { LOController } from './lo.controller';
import { LOService } from './lo.service';

@Module({
  imports: [TypeOrmModule.forFeature([LO])],
  controllers: [LOController],
  providers: [LOService],
  exports: [LOService, TypeOrmModule],
})
export class LOModule {}
