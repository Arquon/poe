import { IUserData } from "@@@/types/user/IUserData";

export class UserDto implements IUserData {
   id: number;
   nickname: string;

   constructor(user: IUserData) {
      this.id = user.id;
      this.nickname = user.nickname;
   }
}
