import { IUserStorage } from "@/types/storage/IUserStorage";
import { IAuthData, IAuthDataWithId } from "@@@/types/auth/IAuthData";
import { IUserData, IUserDataWithPassword } from "@@@/types/user/IUserData";

import db from "@/db";

const INSERT_INTO_USER_QUERY = "SELECT * FROM add_user($1, $2)";
const GET_USER_ATTEMPTS_QUERY = "SELECT id, nickname FROM get_users()";
const GET_SINGLE_USER_BY_NICKNAME_ATTEMPT_QUERY = "SELECT * FROM get_user_by_nickname($1)";
const UPDATE_USER_ATTEMPT_QUERY = "SELECT * FROM update_user($1, $2, $3)";
const DELETE_USER_ATTEMPT_QUERY = "SELECT * FROM delete_user($1)";

export class UserStorageDB implements IUserStorage {
   async createUser(user: IAuthData): Promise<IUserDataWithPassword> {
      const { nickname, password } = user;
      const newUser = await db.query<IUserDataWithPassword>(INSERT_INTO_USER_QUERY, [nickname, password]);
      return newUser.rows[0];
   }

   async getUsers(): Promise<IUserData[]> {
      const users = await db.query<IUserData>(GET_USER_ATTEMPTS_QUERY);
      return users.rows;
   }

   async getOneUserByNickname(nickname: string): Promise<IUserDataWithPassword> {
      const user = await db.query<IUserDataWithPassword>(GET_SINGLE_USER_BY_NICKNAME_ATTEMPT_QUERY, [nickname]);
      return user.rows[0];
   }

   async updateUser(user: IAuthDataWithId): Promise<IUserDataWithPassword> {
      const { id, nickname, password } = user;
      const updatedUser = await db.query<IUserDataWithPassword>(UPDATE_USER_ATTEMPT_QUERY, [id, nickname, password]);
      return updatedUser.rows[0];
   }

   async deleteUser(userId: number): Promise<number> {
      const user = await db.query<IUserData>(DELETE_USER_ATTEMPT_QUERY, [userId]);
      return user.rows[0]?.id;
   }
}

export const userStorageDb = new UserStorageDB();
