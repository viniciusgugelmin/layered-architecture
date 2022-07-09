import User from "../models/User";
import * as usersRepository from "../repositories/UsersRepository.js";
import { AppError } from "../errors/AppError.js";

export default async function verifyUserExists(id): Promise<User> {
  const user = await usersRepository.findById(parseInt(id));

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}
