import { BadRequestException, Injectable } from '@nestjs/common';
import { TeachersRepository } from 'src/repositories/teachers.repository';
import { SubjectsRepository } from 'src/repositories/subjects.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeachersDto } from 'src/teachers/teachers.dto';
import { SubjectsDto } from './subjects.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(SubjectsRepository)
    private readonly subjects: Repository<SubjectsRepository>,
    @InjectRepository(TeachersRepository)
    private readonly teachers: Repository<TeachersRepository>,
  ) {}

  public async AddOneSubject(
    subject: SubjectsDto,
    teacherDni: string,
  ): Promise<object> {
    if (!subject.name || !teacherDni)
      throw new BadRequestException('Incomplete data');
    subject.teacher = await this.teachers.findOne({
      dni: teacherDni,
      state: true,
    });
    if (!subject.teacher)
      throw new BadRequestException('The teacher does not exits');
    subject.state = true;
    try {
      await this.subjects.save(subject);
      return {
        message: `The teacher ${subject.teacher.name} ${subject.teacher.last_name} now teachs ${subject.name}`,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException('That teacher already teachs that subject');
    }
  }

  public async DeleteOneSubject(
    nameSubject: string,
    teacherDni: string,
  ): Promise<object> {
    if (!teacherDni || !nameSubject)
      throw new BadRequestException('Incomplete data');
    const subjectToDelete: SubjectsDto = await this.subjects.findOne({
      name: nameSubject,
      teacher: {
        dni: teacherDni,
      },
    });
    if (!subjectToDelete)
      throw new BadRequestException('The subject does not exits');
    try {
      subjectToDelete.state = false;
      await this.subjects.save(subjectToDelete);
      return {
        message: `Subject ${subjectToDelete.name} thats ${subjectToDelete.teacher.name} ${subjectToDelete.teacher.last_name} taught has been removed`,
      };
    } catch (err) {
      console.log(err);
    }
  }
}
