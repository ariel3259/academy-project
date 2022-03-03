import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { CoursesRepository } from 'src/repositories/courses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [RepositoriesModule, TypeOrmModule.forFeature([CoursesRepository])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
