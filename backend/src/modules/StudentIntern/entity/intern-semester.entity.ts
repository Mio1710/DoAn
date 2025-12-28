import { BaseEntity } from 'src/modules/common/entities/base.entity';
import { Semester } from 'src/modules/common/entities/semester.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Intern } from './intern.entity';

@Entity('intern_semester')
export class InternSemester extends BaseEntity {
  @ManyToOne(() => Intern)
  @JoinColumn({ name: 'intern_id' })
  intern: Intern;

  @Column({ name: 'intern_id' })
  intern_id: number;

  @ManyToOne(() => Semester)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

  @Column({ name: 'semester_id' })
  semester_id: number;
}
