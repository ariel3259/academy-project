import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyRepository } from 'src/repositories/academy.repository';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { UsersRepository } from 'src/repositories/users.repository';
import { AcademyController } from './academy.controller';
import { AcademyService } from './academy.service';

@Module({
  imports: [
    RepositoriesModule,
    TypeOrmModule.forFeature([AcademyRepository, UsersRepository]),
  ],
  controllers: [AcademyController],
  providers: [AcademyService],
})
export class AcademyModule {}
