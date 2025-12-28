import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { Semester } from '../common/entities/semester.entity';

@Injectable()
export class SemesterService {
  constructor(
    @InjectRepository(Semester)
    private readonly semesterRepository: Repository<Semester>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,

    private readonly commonService: CommonService,
  ) {}

  async getLists(options): Promise<Semester[]> {
    console.log('options', options);

    return await this.semesterRepository
      .createQueryBuilder('semester')
      .leftJoinAndSelect('semester.createdBy', 'user')
      .select(['semester', 'user.ten', 'user.hodem', 'user.id'])
      .orderBy('semester.created_at', 'DESC')
      .getMany();
  }

  async create(semester): Promise<Semester> {
    return this.semesterRepository.save(semester);
  }

  async update(id: number, semester: Semester) {
    const resutl = await this.semesterRepository.update(id, semester);
    await this.cacheManager.set('activeSemester', semester);
    return resutl;
  }

  async delete(id: number): Promise<Semester[]> {
    const semester = await this.semesterRepository.find({ where: { id } });
    return await this.semesterRepository.remove(semester);
  }

  async findOne(options): Promise<Semester> {
    try {
      console.log('options', options);

      const semester = await this.semesterRepository.findOne({
        where: { ...options },
      });

      return semester;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async activeSemester(options): Promise<Semester> {
    try {
      // find current active semester and update options.id to active
      const currentSemester = await this.semesterRepository.findOne({
        where: { status: true },
      });

      console.log('currentSemester', currentSemester, options);

      if (currentSemester) {
        currentSemester.status = false;
        await this.semesterRepository.save(currentSemester);
      }

      const semester = await this.semesterRepository.findOne({
        where: options,
      });
      console.log('semester', semester);
      semester.status = true;
      return await this.semesterRepository.save(semester);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async allowRegisterGroup(): Promise<boolean> {
    const semester = await this.commonService.getActiveSemester();
    if (!semester) {
      throw new HttpException('Semester not found', 404);
    }
    const currentDate = new Date();
    const startDate = new Date(semester.start_register_group);
    const endDate = new Date(semester.end_register_group);

    console.log('allowRegisterGroup', currentDate, startDate, endDate);

    return currentDate >= startDate && currentDate <= endDate;
  }

  async allowRegisterTopic(): Promise<boolean> {
    const semester = await this.commonService.getActiveSemester();
    if (!semester) {
      throw new HttpException('Semester not found', 404);
    }
    const currentDate = new Date();
    const startDate = new Date(semester.start_register_topic);
    const endDate = new Date(semester.end_register_topic);

    console.log('allowRegisterTopic', currentDate, startDate, endDate);

    return currentDate >= startDate && currentDate <= endDate;
  }

  async allowPublishTopic(): Promise<boolean> {
    const semester = await this.commonService.getActiveSemester();
    if (!semester) {
      throw new HttpException('Semester not found', 404);
    }
    // if (!semester.start_publish_topic || !semester.end_publish_topic) {
    //   return false;
    // }

    const currentDate = new Date();
    const startDate = new Date(semester.start_publish_topic);
    const endDate = new Date(semester.end_publish_topic);

    console.log(
      'allowPublishTopic',
      semester,
      currentDate,
      startDate,
      endDate,
      semester.start_publish_topic,
      semester.end_publish_topic,
    );

    return currentDate >= startDate && currentDate <= endDate;
  }
}
