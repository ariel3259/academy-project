import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesRepository } from 'src/repositories/courses.repository';
import { CoursesStudentsRepository } from 'src/repositories/courses_students.repository';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { StudentsRepository } from 'src/repositories/students.repository';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [
    RepositoriesModule,
    TypeOrmModule.forFeature([
      StudentsRepository,
      CoursesRepository,
      CoursesStudentsRepository,
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
