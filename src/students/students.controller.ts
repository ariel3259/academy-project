import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { StudentsDto } from './students.dto';
import { StudentsService } from './students.service';

@Controller('api/students')
export class StudentsController {
  constructor(private readonly students: StudentsService) {}

  @Post()
  public async RegisterStudent(@Body() student: StudentsDto): Promise<object> {
    return await this.students.AddStudent(student);
  }

  @Delete(':dni')
  public async ExpellStudent(@Param('dni') dni: string): Promise<object> {
    return await this.students.ExpellStudent(dni);
  }
}
