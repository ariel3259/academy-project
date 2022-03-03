import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
} from 'typeorm';
import { CoursesRepository } from './courses.repository';
import { StudentsRepository } from './students.repository';

@Entity('courses_students')
@Unique(['student'])
export class CoursesStudentsRepository {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => CoursesRepository, (course) => (course = course))
  @JoinColumn()
  course: CoursesRepository;
  @OneToOne(() => StudentsRepository)
  @JoinColumn()
  student: StudentsRepository;
}