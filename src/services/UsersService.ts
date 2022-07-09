import * as usersRepository from "../repositories/UsersRepository.js";
import User from "../models/User.js";
import verifyUserExists from "../utils/verifyUserExists";
import verifyIsUserEmailAlreadyInUse from "../utils/verifyIsUserEmailAlreadyInUse";

export async function getUsers(): Promise<User[]> {
  return await usersRepository.findAll();
}

export async function getUser(id: number): Promise<User> {
  return await verifyUserExists(id);
}

export async function updateUser(user: User): Promise<void> {
  const existentUser = await verifyUserExists(user.id);
  await verifyIsUserEmailAlreadyInUse(user.email, user.id);

  user.password = await usersRepository.hashPassword(user.password);
  user = Object.assign({}, existentUser, user);

  await usersRepository.update(user);
}

export async function createUser(user: Omit<User, "id">): Promise<void> {
  await verifyIsUserEmailAlreadyInUse(user.email);

  user.password = await usersRepository.hashPassword(user.password);

  await usersRepository.create(user);
}

export async function deleteUser(id: number): Promise<void> {
  await verifyUserExists(id);

  await usersRepository.remove(id);
}
