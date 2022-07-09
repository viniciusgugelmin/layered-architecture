import { AppError } from "../errors/AppError.js";
import * as usersRepository from "../repositories/UsersRepository.js";
import { hashPassword } from "../repositories/UsersRepository.js";
import User from "../models/User.js";

export async function getUsers(): Promise<User[]> {
  return await usersRepository.findAll();
}

export async function getUser(id: number): Promise<User> {
  const user = await usersRepository.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}

export async function updateUser(user: User): Promise<void> {
  const existentUser = await usersRepository.findById(user.id);

  if (!existentUser) {
    throw new AppError("User not found", 404);
  }

  const isEmailAlreadyInUse = await usersRepository.findByEmail(user.email);

  if (isEmailAlreadyInUse && isEmailAlreadyInUse.id !== user.id) {
    throw new AppError("Email already in use", 400);
  }

  user.password = await hashPassword(user.password);

  user = Object.assign({}, existentUser, user);

  await usersRepository.update(user);
}

export async function createUser(user: Omit<User, "id">): Promise<void> {
  const isEmailAlreadyInUse = await usersRepository.findByEmail(user.email);

  if (isEmailAlreadyInUse) {
    throw new AppError("Email already in use", 400);
  }

  user.password = await usersRepository.hashPassword(user.password);

  await usersRepository.create(user);
}

export async function deleteUser(id: number): Promise<void> {
  const existentUser = await usersRepository.findById(id);

  if (!existentUser) {
    throw new AppError("User not found", 404);
  }

  await usersRepository.remove(id);
}
