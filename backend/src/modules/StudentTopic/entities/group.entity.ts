import { BaseEntity } from 'src/modules/common/entities/base.entity';
import { Student } from 'src/modules/common/entities/student.entity';
import { StudentTopic } from 'src/modules/StudentTopic/entities/student-topic.entity';
import { TeacherGroup } from 'src/modules/Teacher/entity/teacher_group.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('groups')
export class Group extends BaseEntity {
  @OneToOne(() => Student, (student) => student.group)
  @JoinColumn({ name: 'first_partner_id' })
  firstPartner?: StudentTopic;

  @OneToOne(() => Student, (student) => student.group)
  @JoinColumn({ name: 'second_partner_id' })
  secondPartner?: StudentTopic;

  @Column({ name: 'first_partner_id', nullable: true })
  first_partner_id: number;

  @Column({ name: 'second_partner_id', nullable: true })
  second_partner_id: number;

  @OneToMany(() => StudentTopic, (studentTopic) => studentTopic.group)
  studentTopics: StudentTopic[];

  @ManyToOne(() => TeacherGroup, (teacherGroup) => teacherGroup.studentGroups)
  @JoinColumn({ name: 'teacher_group_id' })
  teacherGroup: TeacherGroup;
}
