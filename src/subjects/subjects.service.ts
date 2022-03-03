import { BadRequestException, Injectable } from '@nestjs/common';
import { TeachersRepository } from 'src/repositories/teachers.repository';
import { SubjectsRepository } from 'src/repositories/subjects.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectsDto } from './Dto/subjects.dto';
import { CoursesRepository } from 'src/repositories/courses.repository';
import { CoursesSubjectsRepository } from 'src/repositories/courses_subjects.repository';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(SubjectsRepository)
    private readonly subjects: Repository<SubjectsRepository>,
    @InjectRepository(TeachersRepository)
    private readonly teachers: Repository<TeachersRepository>,
    @InjectRepository(CoursesRepository)
    private readonly courses: Repository<CoursesRepository>,
    @InjectRepository(CoursesSubjectsRepository)
    private readonly coursesSubjects: Repository<CoursesSubjectsRepository>,
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
    subject.name = subject.name.replace(/ /g, '_');
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
      name: nameSubject.replace(/ /g, '_'),
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

  public async AddASubjectToCourse(
    nameSubject: string,
    teacherDni: string,
    grade: string,
    speciality: string,
  ): Promise<object> {
    if (!nameSubject || !teacherDni || !grade || !speciality)
      throw new BadRequestException('Incomplete data');
    const teacher = await this.teachers.findOne({
      dni: teacherDni,
      state: true,
    });
    if (!teacher)
      throw new BadRequestException(
        'The theacher does not exits or has been removed',
      );
    const subject = await this.subjects.findOne({
      name: nameSubject,
      teacher: teacher,
      state: true,
    });
    const course = await this.courses.findOne({
      grade: grade,
      speciality: speciality,
    });
    if (!subject || !course)
      throw new BadRequestException('The course/subject does not exits');
    try {
      await this.coursesSubjects.save({
        course: course,
        subject: subject,
      });
      return {
        message: `${course.grade} ${course.speciality} now has ${subject.name}`,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException('maybe the course already has that course');
    }
  }
}
