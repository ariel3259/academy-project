import { Module } from '@nestjs/common';
import { AcademyRepository } from './academy.repository';
import { CoursesRepository } from './courses.repository';
import { CoursesAcademyRepository } from './courses_academy.repository';
import { CoursesStudentsRepository } from './courses_students.repository';
import { CoursesSubjectsRepository } from './courses_subjects.repository';
import { StudentsRepository } from './students.repository';
import { SubjectsRepository } from './subjects.repository';
import { TeachersRepository } from './teachers.repository';
import { UsersRepository } from './users.repository';

const repositories = [
  UsersRepository,
  AcademyRepository,
  TeachersRepository,
  StudentsRepository,
  SubjectsRepository,
  CoursesRepository,
  CoursesAcademyRepository,
  CoursesStudentsRepository,
  CoursesSubjectsRepository,
];

@Module({
  providers: repositories,
  exports: repositories,
})
export class RepositoriesModule {}
