import { Body, Controller, Delete, Get, Headers, Post } from '@nestjs/common';
import { CoursesDto } from './Dto/courses.dto';
import { CoursesService } from './courses.service';

@Controller('api/courses')
export class CoursesController {
  constructor(private readonly courses: CoursesService) {}
  @Post()
  async CreateCourse(@Body() course: CoursesDto): Promise<object> {
    return this.courses.CreateCourse(course);
  }
  @Get()
  async GetAllCourses(): Promise<CoursesDto[]> {
    return await this.courses.GetAllCourses();
  }
  @Get('one')
  async GetOneCourse(
    @Headers('course_speciality') courseSpeciality: string,
    @Headers('course_grade') courseGrade: string,
  ): Promise<CoursesDto> {
    return await this.courses.GetOneCouse(courseSpeciality, courseGrade);
  }
  @Delete()
  async RemoveCourse(
    @Headers('course_speciality') courseSpeciality: string,
    @Headers('course_grade') courseGrade: string,
  ): Promise<object> {
    return await this.courses.RemoveCourse(courseSpeciality, courseGrade);
  }
}
