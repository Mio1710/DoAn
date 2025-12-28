import { LO } from 'src/modules/LO/entity/lo.entity';
import { StudentTopic } from 'src/modules/StudentTopic/entities/student-topic.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';

@Entity('lo_student_topics')
@Unique('student_topic_lo', ['student_topic', 'lo'])
export class LOStudentTopic extends BaseEntity {
  @ManyToOne(() => StudentTopic)
  @JoinColumn({ name: 'student_topic_id' })
  student_topic: StudentTopic;

  @ManyToOne(() => LO)
  @JoinColumn({ name: 'lo_id' })
  lo: LO;

  @Column({ type: 'float' })
  score: number;
}
