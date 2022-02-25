import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { TeachersRepository } from './teachers.repository';

@Entity('subjects')
@Unique(['name', 'teacher'])
export class SubjectsRepository{
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @ManyToOne(() => TeachersRepository)
  @JoinColumn()
  teacher: TeachersRepository;
  @Column() state: boolean;
}