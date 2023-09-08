import { IUserData } from "@@@/types/user/IUserData";
import jwt from "jsonwebtoken";
import config from "@/config/config.json";

interface ITokenService {}

export class TokenService implements ITokenService {
   static generateAccessToken(payload: IUserData) {
      return jwt.sign(payload, config.jwt_secret_key);
   }

   static validateAccessToken(token: string) {
      try {
         const userData = jwt.verify(token, config.jwt_secret_key);
         return userData;
      } catch (e) {
         return null;
      }
   }
}
