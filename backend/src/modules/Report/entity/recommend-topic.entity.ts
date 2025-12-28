import { BaseEntity } from 'src/modules/common/entities/base.entity';
import { Student } from 'src/modules/common/entities/student.entity';
import { User } from 'src/modules/common/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('recommend_topic')
export class RecommendTopic extends BaseEntity {
  @Column({ length: 250, type: 'nvarchar' })
  ten: string;

  @Column({ length: 1000, type: 'nvarchar', nullable: true })
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'teacher_id' })
  teacher: User;

  @Column({ name: 'teacher_id' })
  teacher_id: number;

  @Column({ length: 1000, type: 'nvarchar', nullable: true })
  knowledge: string;

  @Column({ length: 1000, type: 'nvarchar', nullable: true })
  reject_reason: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: string;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'created_by' })
  student: Student;
}
