import { BadRequestException, Injectable } from '@nestjs/common';
import { TeachersRepository } from 'src/repositories/teachers.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeachersDto } from './Dto/teachers.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(TeachersRepository)
    private readonly teachers: Repository<TeachersRepository>,
  ) {}

  public async AddTeacher(teacher: TeachersDto): Promise<object> {
    if (!teacher.name || !teacher.last_name || !teacher.born || !teacher.dni)
      throw new BadRequestException('Incomplete data');
    teacher.state = true;
    try {
      await this.teachers.save(teacher);
      return {
        message: `Teacher ${teacher.name} ${teacher.last_name} has been hired`,
      };
    } catch (err) {
      throw new BadRequestException('The teacher already exists');
    }
  }

  public async FiredTeacher(dni: string): Promise<object> {
    if (!dni) throw new BadRequestException('Incomplete data');
    const teacherToFired: TeachersDto = await this.teachers.findOne({
      dni: dni,
    });
    if (!teacherToFired)
      throw new BadRequestException('The teacher does not exits');
    try {
      teacherToFired.state = false;
      await this.teachers.save(teacherToFired);
      return {
        message: `Teacher ${teacherToFired.name} ${teacherToFired.last_name} has been hired`,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Something is wrong');
    }
  }
}
