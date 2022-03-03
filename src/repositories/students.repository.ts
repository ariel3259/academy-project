import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('students')
@Unique(['dni'])
export class StudentsRepository {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() last_name: string;
  @Column() born: string;
  @Column() dni: string;
  @Column() phone: string;
  @Column() state: boolean;
}