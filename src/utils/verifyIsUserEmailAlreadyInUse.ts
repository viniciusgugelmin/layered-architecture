import User from "../models/User";
import * as usersRepository from "../repositories/UsersRepository.js";
import { AppError } from "../errors/AppError.js";

export default async function verifyIsUserEmailAlreadyInUse(email: string, id?: number): Promise<User> {
  const isEmailAlreadyInUse = await usersRepository.findByEmail(email);
  const isEmailAlreadyInUseById = !!(id ? isEmailAlreadyInUse && isEmailAlreadyInUse.id !== id : isEmailAlreadyInUse);

  if (isEmailAlreadyInUse && isEmailAlreadyInUseById) {
    throw new AppError("Email already in use", 400);
  }

  return isEmailAlreadyInUse;
}
