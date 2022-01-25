import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub: user_id } = decoded as TokenPayload;

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new Error("User does not exists!")
    }

    next();
  }catch {
    throw new Error("Invalid token!")
  }
}
