import { UsersDto } from 'src/users/Dto/users.dto';

export class AcademyDto {
  id: number;
  name: string;
  street: string;
  type: string;
  user: UsersDto;
  state: boolean;
}