import { Request, Response } from "express";
import ResponseModel from "../app/ResponseModel.js";
import * as usersService from "../services/UsersService.js";

export async function getUsers(req: Request, res: Response) {
  const users = await usersService.getUsers();

  res.json(new ResponseModel("Users retrieved successfully", 200, users));
}

export async function getUser(req: Request, res: Response) {
  const { id } = req.params;
  const user = await usersService.getUser(parseInt(id));

  res.json(new ResponseModel("User retrieved successfully", 200, user));
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  await usersService.updateUser({ ...req.body, id: parseInt(id) });

  res.json(new ResponseModel("User updated successfully"));
}

export async function createUser(req: Request, res: Response) {
  await usersService.createUser(req.body);

  res.status(201).json(new ResponseModel("User created successfully", 201));
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  await usersService.deleteUser(parseInt(id));

  res.json(new ResponseModel("User deleted successfully"));
}
