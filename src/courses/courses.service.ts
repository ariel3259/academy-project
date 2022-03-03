import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoursesDto } from './Dto/courses.dto';
import { CoursesRepository } from 'src/repositories/courses.repository';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CoursesRepository)
    private readonly courses: Repository<CoursesRepository>,
  ) {}

  public async CreateCourse(course: CoursesDto): Promise<object> {
    if (!course.grade || !course.year || !course.speciality)
      throw new BadRequestException('Incomplete data');
    course.state = true;
    try {
      await this.courses.save(course);
      return {
        message: 'The course has been saved',
      };
    } catch (err) {
      throw new BadRequestException('The course already exits');
    }
  }

  public async GetAllCourses(): Promise<CoursesDto[]> {
    return await this.courses.find({
      state: true,
    });
  }

  public async GetOneCouse(
    courseSpecialiry: string,
    courseGrade: string,
  ): Promise<CoursesDto> {
    if (!courseSpecialiry || !courseGrade)
      throw new BadRequestException('Incomplete data');
    const course: CoursesDto = await this.courses.findOne({
      speciality: courseSpecialiry,
      grade: courseGrade,
    });
    if (!course) throw new BadRequestException('The course does not exits');
    return course;
  }

  public async RemoveCourse(
    courseSpeciality: string,
    courseGrade: string,
  ): Promise<object> {
    if (!courseSpeciality || !courseGrade)
      throw new BadRequestException('Incomplete data');
    const course: CoursesDto = await this.courses.findOne({
      speciality: courseSpeciality,
      grade: courseGrade,
    });
    if (!course) throw new BadRequestException('The course does not exits');
    try {
      course.state = false;
      return {
        message: 'The course has been deleted',
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Something is wrong');
    }
  }
}
