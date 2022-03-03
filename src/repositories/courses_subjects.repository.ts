import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
} from 'typeorm';
import { CoursesRepository } from './courses.repository';
import { SubjectsRepository } from './subjects.repository';

@Entity('courses_subjects')
@Unique(['course', 'subject'])
export class CoursesSubjectsRepository {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(() => CoursesRepository)
  @JoinColumn()
  course: CoursesRepository;
  @ManyToOne(() => SubjectsRepository)
  @JoinColumn()
  subject: SubjectsRepository;
}