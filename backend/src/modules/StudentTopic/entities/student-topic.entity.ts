import { Semester } from 'src/entities';
import { BaseEntity } from 'src/modules/common/entities/base.entity';
import { Student } from 'src/modules/common/entities/student.entity';
import { ReportTopic } from 'src/modules/Report/entity/report.entity';
import { Topic } from 'src/modules/Topic/entities/topic.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Group } from './group.entity';

@Entity('student_topics')
@Index('IDX_student_semester', ['student_id', 'semester_id', 'deleted_at'], {
  unique: true,
})
export class StudentTopic extends BaseEntity {
  @Column({ name: 'student_id' })
  student_id: number;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ name: 'topic_id', nullable: true })
  topic_id: number;

  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @Column({ type: 'enum', enum: ['new', 'finish', 'fail'], default: 'new' })
  status: string;

  @Column({ name: 'semester_id' })
  semester_id: number;

  @ManyToOne(() => Semester)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column({ name: 'group_id', nullable: true })
  group_id: number;

  @Column({ default: 1 })
  khoa_id: number;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deleted_at: Date;

  @OneToMany(() => ReportTopic, (reportTopic) => reportTopic.studentTopic)
  reportTopics: ReportTopic[];
}
