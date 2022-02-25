import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { StudentsRepository } from 'src/repositories/students.repository';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [RepositoriesModule, TypeOrmModule.forFeature([StudentsRepository])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
