import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { TeachersDto } from './teachers.dto';
import { TeachersService } from './teachers.service';

@Controller('api/teachers')
export class TeachersController {
  constructor(private readonly teacher: TeachersService) {}

  @Post()
  public async AddTeacher(@Body() teacher: TeachersDto): Promise<object> {
    return await this.teacher.AddTeacher(teacher);
  }

  @Delete(':dni')
  public async Firedeacher(@Param('dni') dni: string): Promise<object> {
    return await this.teacher.FiredTeacher(dni);
  }
}
