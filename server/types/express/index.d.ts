import { IUserData } from "@@@/types/user/IUserData";

export {};

declare global {
   namespace Express {
      export interface Request {
         user?: IUserData;
      }
   }
}
