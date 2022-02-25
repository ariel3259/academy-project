import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersRepository } from 'src/repositories/teachers.repository';

@Module({
  imports: [RepositoriesModule, TypeOrmModule.forFeature([TeachersRepository])],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
