import { CoursesDto } from 'src/courses/Dto/courses.dto';
import { StudentsDto } from './students.dto';

export class CourseStudentsDto {
  course: CoursesDto;
  student: StudentsDto;
}