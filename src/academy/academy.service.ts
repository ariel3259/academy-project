import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AcademyRepository } from 'src/repositories/academy.repository';
import { Repository } from 'typeorm';
import { AcademyDto } from './academy.dto';
import { UsersRepository } from 'src/repositories/users.repository';

@Injectable()
export class AcademyService {
  constructor(
    @InjectRepository(AcademyRepository)
    private readonly academy: Repository<AcademyRepository>,
    @InjectRepository(UsersRepository)
    private readonly users: Repository<UsersRepository>,
  ) {}

  public async AddAcademy(
    academy: AcademyDto,
    idUser: number,
  ): Promise<object> {
    if (!academy.name || !academy.street || !academy.type)
      throw new BadRequestException('Incomplete data');
    academy.user = await this.users.findOne({ id: idUser });
    if (!academy.user)
      throw new BadRequestException('The user does not exists');
    try {
      academy.state = true;
      await this.academy.save(academy);
      return { message: `Academy ${academy.name} was registred` };
    } catch (err) {
      throw new BadRequestException('Already exists this academy');
    }
  }

  public async DeleteAcademy(id: number) {
    if (!id) throw new BadRequestException('Incomplete data');
    try {
      await this.academy.save({ id: id, state: false });
      return { message: 'erased academy' };
    } catch (err) {
      throw new BadRequestException('The academy does not exists');
    }
  }
}
