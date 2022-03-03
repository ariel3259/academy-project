import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoriesModule } from './repositories/repositories.module';
import { UsersRepository } from './repositories/users.repository';
import { AcademyModule } from './academy/academy.module';
import { AcademyRepository } from './repositories/academy.repository';
import { TeachersModule } from './teachers/teachers.module';
import { TeachersRepository } from './repositories/teachers.repository';
import { AuthentificationMiddleware } from './authentification.middleware';
import { StudentsModule } from './students/students.module';
import { StudentsRepository } from './repositories/students.repository';
import { CoursesRepository } from './repositories/courses.repository';
import { SubjectsRepository } from './repositories/subjects.repository';
import { SubjectsModule } from './subjects/subjects.module';
import { CoursesModule } from './courses/courses.module';
import { CoursesAcademyRepository } from './repositories/courses_academy.repository';
import { CoursesSubjectsRepository } from './repositories/courses_subjects.repository';
import { CoursesStudentsRepository } from './repositories/courses_students.repository';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'academy_db',
      entities: [
        UsersRepository,
        AcademyRepository,
        TeachersRepository,
        StudentsRepository,
        SubjectsRepository,
        CoursesRepository,
        CoursesAcademyRepository,
        CoursesStudentsRepository,
        CoursesSubjectsRepository,
      ],
      synchronize: true,
    }),
    RepositoriesModule,
    AcademyModule,
    TeachersModule,
    StudentsModule,
    SubjectsModule,
    CoursesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /*
    consumer.apply(AuthentificationMiddleware).forRoutes('api/academy');
    consumer.apply(AuthentificationMiddleware).forRoutes('api/teachers');
    consumer.apply(AuthentificationMiddleware).forRoutes('api/students');
    consumer.apply(AuthentificationMiddleware).forRoutes('api/subjects');
    consumer.apply(AuthentificationMiddleware).forRoutes('api/courses');
    */
  }
}
