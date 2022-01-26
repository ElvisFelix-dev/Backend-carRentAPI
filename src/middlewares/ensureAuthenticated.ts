import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import { AppError } from '../errors/AppError';

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
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub: user_id } = decoded as TokenPayload;

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("User does not exists!", 401)
    }

    request.user = {
      id: user_id
    }

    next();
  }catch {
    throw new AppError("Invalid token!", 401)
  }
}
