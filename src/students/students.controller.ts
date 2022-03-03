import { Body, Controller, Delete, Post, Headers } from '@nestjs/common';
import { StudentsDto } from './Dto/students.dto';
import { StudentsService } from './students.service';

@Controller('api/students')
export class StudentsController {
  constructor(private readonly students: StudentsService) {}

  @Post()
  public async RegisterStudent(@Body() student: StudentsDto): Promise<object> {
    return await this.students.AddStudent(student);
  }

  @Delete()
  public async ExpellStudent(
    @Headers('students_dni') dni: string,
  ): Promise<object> {
    return await this.students.ExpellStudent(dni);
  }

  @Post('course')
  public async RegisterStudentToOneCourse(
    @Headers('students_dni') dni: string,
    @Headers('grade') grade: string,
    @Headers('speciality') speciality: string,
  ): Promise<object> {
    return await this.students.RegisterStudentToCourse(grade, speciality, dni);
  }
}
