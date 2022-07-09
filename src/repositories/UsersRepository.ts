import {connectDB} from "../app/database.js";
import sqlstring from "sqlstring";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function findAll(): Promise<User[]> {
  const db = await connectDB();
  const {rows} = await db.query<User>(`SELECT * FROM users`);

  return rows;
}

export async function findById(id: number): Promise<User> {
  const query = sqlstring.format("SELECT * FROM users WHERE id = ?", [id]);

  const db = await connectDB();
  const {rows} = await db.query<User>(query);

  return rows[0];
}

export async function findByEmail(email: string): Promise<User> {
  const query = sqlstring.format("SELECT * FROM users WHERE email = ?", [email]);

  const db = await connectDB();
  const {rows} = await db.query<User>(query);

  return rows[0];
}

export async function update({id, name, email, password}: User): Promise<void> {
  const query = sqlstring.format("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?", [
    name,
    email,
    password,
    id,
  ]);

  const db = await connectDB();
  await db.query<User>(query);
}

export async function create({name, email, password}: Omit<User, "id">): Promise<void> {
  const query = sqlstring.format("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);

  const db = await connectDB();
  await db.query<User>(query);
}

export async function remove(id): Promise<void> {
  const query = sqlstring.format("DELETE FROM users WHERE id = ?", [id]);

  const db = await connectDB();
  await db.query<User>(query);
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function checkPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
