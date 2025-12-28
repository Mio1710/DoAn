import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Semester } from './entities/semester.entity';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(Semester)
    private readonly semesterRepository: Repository<Semester>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async getActiveSemester(): Promise<Semester> {
    const activeSemesterCache = await this.cacheManager.get('activeSemester');
    if (!activeSemesterCache) {
      const semester = await this.semesterRepository.findOne({
        where: { status: true },
        select: [
          'id',
          'ten',
          'status',
          'start_date',
          'end_date',
          'start_register_topic',
          'end_register_topic',
          'start_publish_topic',
          'end_publish_topic',
          'start_register_group',
          'end_register_group',
          'start_defense',
          'end_defense',
          'start_report_topic',
          'end_report_topic',
          'public_result',
        ],
      });
      await this.cacheManager.set('activeSemester', semester);
      return semester;
    }
    return activeSemesterCache as Semester;
  }
}
