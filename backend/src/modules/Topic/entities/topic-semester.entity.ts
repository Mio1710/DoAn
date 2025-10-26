import { Semester } from 'src/entities';
import { BaseEntity } from 'src/modules/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Topic } from './topic.entity';

@Entity('topic_semester')
export class TopicSemester extends BaseEntity {
  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @Column({ name: 'topic_id' })
  topic_id: number;

  @ManyToOne(() => Semester)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

  @Column({ name: 'semester_id' })
  semester_id: number;
}
