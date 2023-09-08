import { IUserData } from "../../user/IUserData";

export interface IUserResponse<T extends IUserData = IUserData> {
   user: T;
}
