import { BaseEntity } from 'src/modules/common/entities/base.entity';
import { User } from 'src/modules/common/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TeacherGroup } from './teacher_group.entity';

@Entity('teacher_group_members')
export class TeacherGroupMember extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'teacher_id' })
  teacher: User;

  @Column({ name: 'teacher_id', nullable: true })
  teacher_id: number;

  @ManyToOne(() => TeacherGroup, (teacherGroup) => teacherGroup.teachers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_group_id' })
  teacher_group: TeacherGroup;
}
