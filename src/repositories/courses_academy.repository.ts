import {
  Entity,
  ManyToOne,
  JoinColumn,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AcademyRepository } from './academy.repository';
import { CoursesRepository } from './courses.repository';

@Entity('courses_academy')
@Unique(['course', 'academy'])
export class CoursesAcademyRepository{
  @PrimaryGeneratedColumn() id: number; 
  @ManyToOne(() => CoursesRepository)
  @JoinColumn()
  course: CoursesRepository;
  @ManyToOne(() => AcademyRepository)
  @JoinColumn()
  academy: AcademyRepository;
}