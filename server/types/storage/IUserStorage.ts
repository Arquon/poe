import { IAuthData, IAuthDataWithId } from "@@@/types/auth/IAuthData";
import { IUserData, IUserDataWithPassword } from "@@@/types/user/IUserData";

export interface IUserStorage {
   createUser(user: IAuthData): Promise<IUserDataWithPassword>;
   getUsers(): Promise<IUserData[]>;
   getOneUserByNickname(nickname: string): Promise<IUserDataWithPassword>;
   updateUser(user: IAuthDataWithId): Promise<IUserDataWithPassword>;
   deleteUser(userId: number): Promise<number>;
}
