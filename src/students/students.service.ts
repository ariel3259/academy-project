import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsRepository } from 'src/repositories/students.repository';
import { StudentsDto } from './students.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentsRepository)
    private readonly student: Repository<StudentsRepository>,
  ) {}

  public async AddStudent(student: StudentsDto): Promise<object> {
    if (!student.name || !student.last_name || !student.born || !student.dni)
      throw new BadRequestException('Incomplete data');
    student.state = true;
    try {
      await this.student.save(student);
      return {
        message: `student ${student.name} ${student.last_name} registred`,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Something is wrong');
    }
  }

  public async ExpellStudent(dni: string): Promise<object> {
    if (!dni) throw new BadRequestException('Incomplete data');
    const studentToExpell: StudentsDto = await this.student.findOne({
      dni: dni,
      state: true,
    });
    if (!studentToExpell)
      throw new BadRequestException('The student does not exits');
    studentToExpell.state = false;
    try {
      await this.student.save(studentToExpell);
      return {
        message: `Student ${studentToExpell.name} ${studentToExpell.last_name} has been expelled`,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Something is wrong');
    }
  }
}
