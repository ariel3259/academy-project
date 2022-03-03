import { TeachersDto } from 'src/teachers/Dto/teachers.dto';

export class SubjectsDto {
  name: string;
  teacher: TeachersDto;
  state: boolean;
}