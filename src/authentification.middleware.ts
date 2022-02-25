import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthentificationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const jwt = await import('jsonwebtoken');
    if (!req.headers.authorization)
      throw new BadRequestException('You have no token to go in');
    jwt.verify(req.headers.authorization, 'loremloremlorem', (err) => {
      if (err) throw new BadRequestException('Your token is invalid');
      next();
    });
  }
}
