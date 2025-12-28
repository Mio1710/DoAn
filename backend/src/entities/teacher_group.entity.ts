import { Faculty } from 'src/modules/common/entities/faculty.entity';
import { Group } from 'src/modules/StudentTopic/entities/group.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Semester } from './semester.entity';
import { TeacherGroupMember } from './teacher_group_member.entity';

@Entity('teacher_groups')
export class TeacherGroup extends BaseEntity {
  @OneToMany(() => TeacherGroupMember, (member) => member.teacher_group)
  teachers?: TeacherGroupMember[];

  @ManyToOne(() => Semester)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

  @ManyToOne(() => Faculty)
  @JoinColumn({ name: 'khoa_id' })
  faculty: Faculty;

  @Column({ name: 'khoa_id', nullable: true })
  faculty_id: number;

  @Column({ length: 100, type: 'varchar' })
  name: string;

  @OneToMany(() => Group, (member) => member.teacherGroup)
  studentGroups: TeacherGroupMember[];
}
