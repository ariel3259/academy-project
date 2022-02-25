import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('teachers')
@Unique(['dni'])
export class TeachersRepository {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() last_name: string;
  @Column() born: string;
  @Column() state: boolean;
  @Column() dni: string;
}