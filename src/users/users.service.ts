import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepository } from 'src/repositories/users.repository';
import { UsersDto } from './users.dto';
import * as EmailValidator from 'email-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: Repository<UsersRepository>,
  ) {}

  async Register(user: UsersDto): Promise<object> {
    const bcrypt = await import('bcrypt');
    if (
      !user.name ||
      !user.last_name ||
      !user.phone_number ||
      !user.country ||
      !user.state ||
      !user.email ||
      !user.password
    )
      throw new BadRequestException('Incomplete data');
    if (!EmailValidator.validate(user.email))
      throw new BadRequestException('Invalid email');
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
    try {
      await this.usersRepository.save(user);
      return { message: 'Congratulations your account has been created' };
    } catch (err) {
      throw new BadRequestException('The user already exits');
    }
  }

  async Auth(user: UsersDto): Promise<object> {
    const bcrypt = await import('bcrypt');
    const jwt = await import('jsonwebtoken');
    if (!user.email || !user.password)
      throw new BadRequestException('Invalid data');
    if (!EmailValidator.validate(user.email))
      throw new BadRequestException('Invalid email');
    const verifyUser: UsersDto = await this.usersRepository.findOne({
      email: user.email,
    });
    if (!(await bcrypt.compare(user.password, verifyUser.password)))
      throw new BadRequestException('Wrong password');
    const token: string = jwt.sign(
      {
        check: true,
        subject: verifyUser.id,
        issuer: 'http://localhost:8000/',
      },
      'loremloremlorem',
      {
        expiresIn: '30m',
      },
    );
    return {
      message: `Welcome ${verifyUser.name} ${verifyUser.last_name}`,
      token,
    };
  }
}
