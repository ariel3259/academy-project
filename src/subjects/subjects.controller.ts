import { Body, Controller, Post, Headers, Delete } from '@nestjs/common';
import { SubjectsDto } from './Dto/subjects.dto';
import { SubjectsService } from './subjects.service';

@Controller('api/subjects')
export class SubjectsController {
  constructor(private readonly subjects: SubjectsService) {}

  @Post()
  async AddSubject(
    @Body() subject: SubjectsDto,
    @Headers('teachers_dni') teacherDni: string,
  ): Promise<object> {
    return await this.subjects.AddOneSubject(subject, teacherDni);
  }

  @Delete()
  async DeleteSubject(
    @Headers('teachers_dni') teacherDni: string,
    @Headers('subject_name') subjectName: string,
  ): Promise<object> {
    return await this.subjects.DeleteOneSubject(subjectName, teacherDni);
  }

  @Post('course')
  async AddASubjectToACourse(
    @Headers('teachers_dni') dni: string,
    @Headers('subject_name') name: string,
    @Headers('grade') grade: string,
    @Headers('speciality') speciality: string,
  ): Promise<object> {
    return await this.subjects.AddASubjectToCourse(
      name,
      dni,
      grade,
      speciality,
    );
  }
}
