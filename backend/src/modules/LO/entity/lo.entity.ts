import { BaseEntity } from 'src/modules/common/entities/base.entity';
import { Faculty } from 'src/modules/common/entities/faculty.entity';
import { LOStudentTopic } from 'src/modules/StudentTopic/entities/lo-student-topic.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity('los')
export class LO extends BaseEntity {
  @Column({ length: 1000, type: 'nvarchar' })
  main_criteria: string;

  @Column({ length: 1000, type: 'nvarchar', nullable: true })
  sub_criteria: string;

  @Column({ type: 'float' })
  cof: number;

  @Column({ default: 1 })
  allow_update: boolean;

  @ManyToOne(() => Faculty)
  @JoinColumn({ name: 'khoa_id' })
  faculty: Faculty;

  @Column({ name: 'khoa_id', nullable: true })
  khoa_id: number;

  @OneToOne(() => LOStudentTopic, (loStudentTopic) => loStudentTopic.lo)
  loStudentTopic: LOStudentTopic;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deleted_at: Date;
}
