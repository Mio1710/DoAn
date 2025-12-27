import { BaseEntity } from 'src/modules/common/entities/base.entity';
import { User } from 'src/modules/common/entities/user.entity';
import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';

@Entity()
export class Faculty extends BaseEntity {
  @Column({ length: 10, type: 'char', nullable: true })
  ma_khoa: string;

  @Column({ length: 155, type: 'varchar' })
  ten: string;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deleted_at: Date;

  @OneToMany(() => User, (user) => user.faculty)
  teachers: User[];
}
