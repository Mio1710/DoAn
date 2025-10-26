import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Faculty } from './faculty.entity';
import { Semester } from './semester.entity';
import { Student } from './student.entity';

@Entity('student_subject')
export class StudentSubject {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column()
  subject_id: number;

  @Column({ type: 'enum', enum: ['topic', 'intern'] })
  subject_type: string;

  @Column({ type: 'enum', enum: ['new', 'finish', 'fail'], default: 'new' })
  subject_status: string;

  @Column({ nullable: true, default: null })
  group: number;

  @ManyToOne(() => Semester)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

  @ManyToOne(() => Faculty)
  @JoinColumn({ name: 'khoa_id' })
  faculty: Faculty;
}
