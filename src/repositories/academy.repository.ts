import {
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  Unique,
  Entity,
} from 'typeorm';
import { UsersRepository } from './users.repository';

@Entity('academy')
@Unique(['name', 'street', 'type'])
export class AcademyRepository {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() street: string;
  @Column() type: string;
  @OneToOne(() => UsersRepository)
  @JoinColumn()
  user: UsersRepository;
  @Column() state: boolean;
}