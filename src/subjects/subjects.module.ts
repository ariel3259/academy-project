import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsRepository } from 'src/repositories/subjects.repository';
import { TeachersRepository } from 'src/repositories/teachers.repository';

@Module({
  imports: [
    RepositoriesModule,
    TypeOrmModule.forFeature([SubjectsRepository, TeachersRepository]),
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
