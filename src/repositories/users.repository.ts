import { PrimaryGeneratedColumn, Unique, Column, Entity } from 'typeorm';

@Entity('users')
@Unique(['email'])
@Unique(['dni'])
export class UsersRepository {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() last_name: string;
  @Column() dni: string;
  @Column() email: string;
  @Column() password: string;
}