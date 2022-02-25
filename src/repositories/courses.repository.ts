import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { StudentsRepository } from './students.repository';
import { SubjectsRepository } from './subjects.repository';

@Entity('courses')
export class CoursesRepository {
  @PrimaryGeneratedColumn() id: number;
  @Column() year: number;
  @Column() grade: string;
  @ManyToMany(() => SubjectsRepository, (subjects) => (subjects = subjects))
  @JoinColumn()
  subjects: SubjectsRepository[];
  @Column() sate: boolean;
  @OneToMany(() => StudentsRepository, (students) => (students = students))
  @JoinColumn()
  students: StudentsRepository[];
  @Column() state: boolean;
  @Column() speciality: string;
}
