import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
@Entity('courses')
@Unique(['grade', 'speciality'])
export class CoursesRepository {
  @PrimaryGeneratedColumn() id: number;
  @Column() year: string;
  @Column() grade: string;
  @Column() state: boolean;
  @Column() speciality: string;
}
