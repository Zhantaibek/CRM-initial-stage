import db from "../config/db";
import { User } from "../types/user";

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const stmt = db.prepare(
    "INSERT INTO Users (username, password, role) VALUES (?, ?, ?)"
  );

  const info = stmt.run(user.username, user.password, user.role);

  return {
    id: Number(info.lastInsertRowid),
    ...user,
  };
};

export const getUserById = async (id: number): Promise<User | null> => {
  const stmt = db.prepare("SELECT * FROM Users WHERE id = ?");
  const user = stmt.get(id) as User | undefined;
  return user || null;
};

export const getUserByName = async (username: string): Promise<User | null> => {
  const stmt = db.prepare("SELECT * FROM Users WHERE username = ?");
  const user = stmt.get(username) as User | undefined;
  return user || null;
};

export const listUsers = async (): Promise<User[]> => {
  const stmt = db.prepare("SELECT * FROM Users");
  const users = stmt.all() as User[];
  return users;
};

export const updateUser = async (id : number , data : Partial <Omit<User , 'id'>>) : Promise<User | null> => {

  const existingUser = await getUserById(id)
  if (!existingUser) return null

  const updatedUser : User = {
    ...existingUser,
    ...data,
  }

  const stmt = db.prepare('UPDATE Users SET username = ? , password = ? , role = ? WHERE id = ?')

  stmt.run(updatedUser.username, updatedUser.password, updatedUser.role, id)
  return updatedUser
}

export const deleteUser = async (id : number) : Promise<{message : string}> => {
  const stmt = db.prepare('DELETE FROM Users WHERE id = ?')
  stmt.run(id)

  return {message : 'User was delete'}
}