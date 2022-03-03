import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AcademyRepository } from 'src/repositories/academy.repository';
import { Repository } from 'typeorm';
import { AcademyDto } from './Dto/academy.dto';
import { UsersRepository } from 'src/repositories/users.repository';
import { CoursesRepository } from 'src/repositories/courses.repository';
import { CoursesAcademyRepository } from 'src/repositories/courses_academy.repository';
import { CoursesDto } from 'src/courses/Dto/courses.dto';

@Injectable()
export class AcademyService {
  constructor(
    @InjectRepository(AcademyRepository)
    private readonly academy: Repository<AcademyRepository>,
    @InjectRepository(UsersRepository)
    private readonly users: Repository<UsersRepository>,
    @InjectRepository(CoursesRepository)
    private readonly courses: Repository<CoursesRepository>,
    @InjectRepository(CoursesAcademyRepository)
    private readonly coursesAcademy: Repository<CoursesAcademyRepository>,
  ) {}

  public async AddAcademy(academy: AcademyDto, dni: string): Promise<object> {
    if (!academy.name || !academy.street || !academy.type || !dni)
      throw new BadRequestException('Incomplete data');
    academy.user = await this.users.findOne({ dni: dni });
    if (!academy.user)
      throw new BadRequestException('The user does not exists');
    academy.state = true;
    academy.name = academy.name.replace(/ /g, '_');
    try {
      await this.academy.save(academy);
      return { message: `Academy ${academy.name} was registred` };
    } catch (err) {
      throw new BadRequestException(
        'Already exists this academy or the head master already is at another academy',
      );
    }
  }

  public async DeleteAcademy(academyName: string, dni: string) {
    if (!academyName || !dni) throw new BadRequestException('Incomplete data');
    const academyToDelete = await this.academy.findOne({
      name: academyName.replace(/ /g, '_'),
      user: {
        dni: dni,
      },
    });
    academyToDelete.state = false;
    try {
      await this.academy.save(academyToDelete);
      return { message: 'erased academy' };
    } catch (err) {
      throw new BadRequestException('The academy does not exists');
    }
  }

  public async AddCourseToAcademy(
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
    const academy = await this.academy.findOne({
      user: {
        dni: dni,
      },
    });
    if (!course || !academy)
      throw new BadRequestException('The academy or the course does not exits');
    try {
      await this.coursesAcademy.save({
        course: course,
        academy: academy,
      });
      return {
        message: `The school ${academy.name} now has ${course.grade} ${course.speciality} course `,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException('That academy already has that course');
    }
  }
}
