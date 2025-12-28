import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../common/entities/student.entity';
import { CreateStudentDto } from './dto/student.dto';

interface StudentOptions {
  id?: number;
  username?: string;
  email?: string;
  maso?: string;

  deleted_at?: Date | null;
}

@Injectable()
export class StudentRepository {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async findOne(options: StudentOptions): Promise<Student> {
    return await this.studentRepository.findOne({ where: { ...options } });
  }

  async create(Student: CreateStudentDto): Promise<Student> {
    return await this.studentRepository.save(Student);
  }

  async update(Student: Student): Promise<Student> {
    return await this.studentRepository.save(Student);
  }

  async delete(id: number): Promise<Student> {
    const Student = await this.studentRepository.findOne({ where: { id } });
    return await this.studentRepository.remove(Student);
  }

  async getListStudentTopics(
    faculty_id: number,
    semester_id: number,
    query,
  ): Promise<Student[]> {
    const queryBuilder = this.studentRepository
      .createQueryBuilder('students')
      .leftJoinAndSelect('students.studentTopic', 'studentTopic')
      .leftJoinAndSelect('studentTopic.topic', 'topic')
      .leftJoinAndSelect('topic.teacher', 'teacher')
      .select([
        'students.id',
        'students.maso',
        'students.hodem',
        'students.ten',
        'students.email',
        'students.lop',
        'students.phone',
        'studentTopic.group_id',
        'topic.ten',
        'teacher.hodem',
        'teacher.ten',
      ])
      .where('students.khoa_id = :khoa_id', { faculty_id })
      .andWhere('studentTopic.status = :status', { status: 'new' })
      .andWhere('studentTopic.semester_id = :semester_id', {
        semester_id,
      });

    if (query?.filter?.q) {
      queryBuilder.andWhere(
        'students.maso like :q or students.hodem like :q or students.ten like :q or students.email like :q or students.lop like :q or students.phone like :q',
        { q: `%${query.filter.q}%` },
      );
    }
    // pagination
    const page = parseInt(query?.page, 10) || 1;
    queryBuilder.offset((page - 1) * 100).limit(100);

    return await queryBuilder.getMany();
  }
}
