import { PrimaryGeneratedColumn, Unique, Column, Entity } from 'typeorm';

@Entity('users')
@Unique(['email'])
export class UsersRepository {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() last_name: string;
  @Column() phone_number: string;
  @Column() country: string;
  @Column() state: string;
  @Column() city: string;
  @Column() email: string;
  @Column() password: string;
}