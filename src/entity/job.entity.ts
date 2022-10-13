import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Skill from './skill.entity';

@Entity('Job')
export default class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ length: 1000 })
  description: string;

  @Column()
  experience: string;

  @Column()
  company: string;

  @Column()
  salary: string;

  @ManyToMany(() => Skill, (sk) => sk.jobs, {})
  @JoinTable()
  skills: Skill[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ select: false })
  createdOn: Date;

  @UpdateDateColumn({ select: false })
  updatedOn: Date;
}
