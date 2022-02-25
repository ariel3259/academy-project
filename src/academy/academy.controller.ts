import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AcademyDto } from './academy.dto';
import { AcademyService } from './academy.service';

@Controller('api/academy')
export class AcademyController {
  constructor(private readonly academy: AcademyService) {}

  @Post(':idUser')
  public async AddAcademy(
    @Body() academy: AcademyDto,
    @Param('idUser') idUser: number,
  ) {
    return await this.academy.AddAcademy(academy, idUser);
  }

  @Delete(':idUser')
  public async DeleteAcademy(@Param('iduser') idUser: number) {
    return await this.academy.DeleteAcademy(idUser);
  }
}
