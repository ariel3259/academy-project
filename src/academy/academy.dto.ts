import { UsersDto } from "src/users/users.dto";

export class AcademyDto {
  id: number;
  name: string;
  street: string;
  type: string;
  user: UsersDto;
  state: boolean;
}