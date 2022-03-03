import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsRepository } from 'src/repositories/subjects.repository';
import { TeachersRepository } from 'src/repositories/teachers.repository';
import { CoursesRepository } from 'src/repositories/courses.repository';
import { CoursesSubjectsRepository } from 'src/repositories/courses_subjects.repository';

@Module({
  imports: [
    RepositoriesModule,
    TypeOrmModule.forFeature([
      SubjectsRepository,
      TeachersRepository,
      CoursesRepository,
      CoursesSubjectsRepository,
    ]),
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
