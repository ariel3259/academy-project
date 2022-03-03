import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyRepository } from 'src/repositories/academy.repository';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { UsersRepository } from 'src/repositories/users.repository';
import { AcademyController } from './academy.controller';
import { AcademyService } from './academy.service';
import { CoursesRepository } from 'src/repositories/courses.repository';
import { CoursesAcademyRepository } from 'src/repositories/courses_academy.repository';
@Module({
  imports: [
    RepositoriesModule,
    TypeOrmModule.forFeature([
      AcademyRepository,
      UsersRepository,
      CoursesRepository,
      CoursesAcademyRepository,
    ]),
  ],
  controllers: [AcademyController],
  providers: [AcademyService],
})
export class AcademyModule {}
