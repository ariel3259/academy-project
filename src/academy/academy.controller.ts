import { Body, Controller, Delete, Headers, Post } from '@nestjs/common';
import { AcademyDto } from './Dto/academy.dto';
import { AcademyService } from './academy.service';

@Controller('api/academy')
export class AcademyController {
  constructor(private readonly academy: AcademyService) {}

  @Post()
  public async AddAcademy(
    @Body() academy: AcademyDto,
    @Headers('academy_head_master_dni') dni: string,
  ) {
    return await this.academy.AddAcademy(academy, dni);
  }

  @Delete()
  public async DeleteAcademy(
    @Headers('academy_name') academyName: string,
    @Headers('academy_head_master_dni') dni: string,
  ) {
    return await this.academy.DeleteAcademy(academyName, dni);
  }

  @Post('course')
  public async AddACourseToAcademy(
    @Headers('dni') dni: string,
    @Headers('grade') grade: string,
    @Headers('speciality') speciality: string,
  ): Promise<object> {
    return await this.academy.AddCourseToAcademy(grade, speciality, dni);
  }
}
