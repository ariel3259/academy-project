import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('students')
export class StudentsRepository {
  @PrimaryColumn() dni: string;
  @Column() name: string;
  @Column() last_name: string;
  @Column() born: string;
  @Column() phone: string;
  @Column() state: boolean;
}