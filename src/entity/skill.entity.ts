import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Job from './job.entity';

@Entity('Skill')
export default class Skill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Job, (jb) => jb.skills)
  jobs: Job[];

  // @ManyToOne(() => Job, (job) => job.skills)
  // job: Job;
}
