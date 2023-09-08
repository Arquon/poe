export interface IUserData {
   nickname: string;
   id: number;
}

export interface IUserDataWithAccessToken extends IUserData {
   accessToken: string;
}

export interface IUserDataWithPassword extends IUserData {
   password: string;
}
