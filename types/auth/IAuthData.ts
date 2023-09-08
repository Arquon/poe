export interface IAuthData {
   nickname: string;
   password: string;
}

export interface IAuthDataWithId extends IAuthData {
   id: number;
}
