import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsRepository } from 'src/repositories/students.repository';
import { StudentsDto } from './Dto/students.dto';
import { CoursesDto } from 'src/courses/Dto/courses.dto';
import { CoursesRepository } from 'src/repositories/courses.repository';
import { CoursesStudentsRepository } from 'src/repositories/courses_students.repository';
import { CourseStudentsDto } from './Dto/courseStudents.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentsRepository)
    private readonly student: Repository<StudentsRepository>,
    @InjectRepository(CoursesRepository)
    private readonly courses: Repository<CoursesRepository>,
    @InjectRepository(CoursesStudentsRepository)
    private readonly coursesStudents: Repository<CoursesStudentsRepository>,
  ) {}

  public async AddStudent(student: StudentsDto): Promise<object> {
    if (
      !student.name ||
      !student.last_name ||
      !student.born ||
      !student.dni ||
      !student.phone
    )
      throw new BadRequestException('Incomplete data');
    student.state = true;
    try {
      await this.student.save(student);
      return {
        message: `student ${student.name} ${student.last_name} registred`,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Something is wrong');
    }
  }

  public async ExpellStudent(dni: string): Promise<object> {
    if (!dni) throw new BadRequestException('Incomplete data');
    const studentToExpell: StudentsDto = await this.student.findOne({
      dni: dni,
      state: true,
    });
    if (!studentToExpell)
      throw new BadRequestException('The student does not exits');
    studentToExpell.state = false;
    try {
      await this.student.save(studentToExpell);
      return {
        message: `Student ${studentToExpell.name} ${studentToExpell.last_name} has been expelled`,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Something is wrong');
    }
  }

  public async RegisterStudentToCourse(
    grade: string,
    speciality: string,
    dni: string,
  ): Promise<object> {
    if (!grade || !speciality || !dni)
      throw new BadRequestException('Incomplete data');
    const course: CoursesDto = await this.courses.findOne({
      grade: grade,
      speciality: speciality,
    });
    const student: StudentsDto = await this.student.findOne({
      dni: dni,
    });
    if (!course || !student) throw new BadRequestException('Incomplete data');
    const studentOnCourse: CourseStudentsDto = {
      course: course,
      student: student,
    };
    try {
      await this.coursesStudents.save(studentOnCourse);
      return {
        message: `Congratulations, now student ${student.name} ${student.last_name} is in ${course.grade} ${course.speciality}`,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException('The student already is at one course');
    }
  }
}
