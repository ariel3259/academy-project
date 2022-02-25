import { TeachersDto } from 'src/teachers/teachers.dto';

export class SubjectsDto {
  name: string;
  teacher: TeachersDto;
  state: boolean;
}